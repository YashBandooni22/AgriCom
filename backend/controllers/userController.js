import validator from 'validator'
import bcrypt from 'bcryptjs'
import userModel from '../models/userModel.js'
import doctorModel from '../models/doctorModel.js'      // You missed importing this
import appointmentModel from '../models/ItemModel.js'  // Also missing import
import productsModel from '../models/productsModel.js'  // Fixed typo here
import ItemModel from '../models/ItemModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import razorpay from 'razorpay'
import mongoose from 'mongoose'

// API to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !password || !email) {
            return res.status(400).json({ success: false, message: "Missing Details" })
        }

        // validating email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Enter a valid email" })
        }

        // validating strong password - upgraded check
        if (!validator.isStrongPassword(password, {
            minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0
        })) {
            return res.status(400).json({ success: false, message: "Enter a stronger password (min 8 chars, 1 uppercase, 1 number)" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })
        const user = await newUser.save()

        // Token expires in 7 days
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.status(201).json({ success: true, token })

    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// API for user Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Missing email or password" })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, message: "User Doesn't Exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid Credentials" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.json({ success: true, token })

    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// API to get user Profile data
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" })
        }

        const userData = await userModel.findById(userId).select('-password')

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        res.json({ success: true, userData })

    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// API to update user profile
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!userId || !name || !phone || !dob || !gender) {
            return res.status(400).json({ success: false, message: "Required data missing" })
        }

        // Validate userId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" })
        }

        let parsedAddress = null
        if (address) {
            try {
                parsedAddress = JSON.parse(address)
            } catch {
                return res.status(400).json({ success: false, message: "Invalid address format" })
            }
        }

        // Update base profile data
        await userModel.findByIdAndUpdate(userId, { name, phone, address: parsedAddress, dob, gender })

        if (imageFile) {
            // Upload image to Cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// API to book appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime, quantity } = req.body;

        if (!userId || !docId || !slotDate || !slotTime || !quantity) {
            return res.status(400).json({ success: false, message: "Missing booking details" });
        }

        // Validate IDs
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(docId)) {
            return res.status(400).json({ success: false, message: "Invalid user or doctor ID" });
        }

        const docData = await doctorModel.findById(docId).select('-password');

        if (!docData) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        if (!docData.available) {
            return res.status(400).json({ success: false, message: "Doctor Not Available" });
        }

        let slots_booked = docData.slots_booked || {};

        // Race condition warning: consider DB-level locking or transactions for production systems.
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.status(400).json({ success: false, message: "Slot Not Available" });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [slotTime];
        }

        const userData = await userModel.findById(userId).select('-password');
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        delete docData.slots_booked; // prevent sending slots_booked in appointment data

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            quantity,
            amount: docData.fees * quantity,
            slotTime,
            slotDate,
            date: Date.now(),
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.status(201).json({ success: true, message: 'Appointment Booked' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// API to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" })
        }

        const appointments = await appointmentModel.find({ userId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body

        if (!userId || !appointmentId) {
            return res.status(400).json({ success: false, message: "Missing parameters" })
        }

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(appointmentId)) {
            return res.status(400).json({ success: false, message: "Invalid IDs" })
        }

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData) {
            return res.status(404).json({ success: false, message: "Appointment not found" })
        }

        // verify appointment user
        if (!appointmentData.userId.equals(userId)) {
            return res.status(403).json({ success: false, message: "Unauthorized Action" })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // releasing doctor slots
        const { docId, slotDate, slotTime } = appointmentData
        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked || {}

        if (slots_booked[slotDate]) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
        }

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: "Appointment Cancelled" })

    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// API to make payment of appointment using razorpay
const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body
        if (!appointmentId) {
            return res.status(400).json({ success: false, message: "Missing appointment ID" })
        }

        if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
            return res.status(400).json({ success: false, message: "Invalid appointment ID" })
        }

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.status(400).json({ success: false, message: "Appointment cancelled or not found" })
        }

        const options = {
            amount: appointmentData.amount * 100, // amount in paise
            currency: process.env.CURRENCY || 'INR',
            receipt: appointmentId,
        }

        const order = await razorpayInstance.orders.create(options)

        res.json({ success: true, order })

    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// API to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body
        if (!razorpay_order_id) {
            return res.status(400).json({ success: false, message: "Missing Razorpay order ID" })
        }

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            res.json({ success: true, message: "Payment Successful" })
        } else {
            res.status(400).json({ success: false, message: "Payment failed" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

export {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointment,
    cancelAppointment,
    paymentRazorpay,
    verifyRazorpay,
}
