import validator from "validator"
import bcrypt from "bcryptjs"
import {v2 as cloudinary} from "cloudinary"
import itemModel from "../models/itemModel.js"
import jwt from 'jsonwebtoken'
import purchaseModel from "../models/purchaseModel.js"
import userModel from "../models/userModel.js"

const addItem = async (req, res) => {
    try {
        const { name, email, password, category, specs, warranty, description, price, address } = req.body;
        const imageFile = req.file;

        if (!name || !email || !password || !category || !specs || !warranty || !description || !price || !address) {
            return res.json({ success: false, message: "Missing details" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const itemData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            category,
            specs,
            warranty,
            description,
            price,
            address: JSON.parse(address),
            date: Date.now()
        };

        const newItem = new itemModel(itemData);
        await newItem.save();

        res.json({ success: true, message: "Item added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const allItems = async (req, res) => {
    try {
        const items = await itemModel.find({}).select('-password');
        res.json({ success: true, items });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const purchasesAdmin = async (req, res) => {
    try {
        const purchases = await purchaseModel.find({});
        res.json({ success: true, purchases });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const purchaseCancel = async (req, res) => {
    try {
        const { purchaseId } = req.body;

        const purchaseData = await purchaseModel.findById(purchaseId);

        await purchaseModel.findByIdAndUpdate(purchaseId, { cancelled: true });

        const { itemId, purchaseDate, purchaseTime } = purchaseData;

        const itemData = await itemModel.findById(itemId);

        let slots_booked = itemData.slots_booked;

        slots_booked[purchaseDate] = slots_booked[purchaseDate].filter(e => e !== purchaseTime);

        await itemModel.findByIdAndUpdate(itemId, { slots_booked });

        res.json({ success: true, message: "Purchase Cancelled" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const adminDashboard = async (req, res) => {
    try {
        const items = await itemModel.find({});
        const users = await userModel.find({});
        const purchases = await purchaseModel.find({});

        const dashData = {
            items: items.length,
            purchases: purchases.length,
            customers: users.length,
            latestPurchases: purchases.reverse().slice(0, 5)
        };

        res.json({ success: true, dashData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addItem, loginAdmin, allItems, purchasesAdmin, purchaseCancel, adminDashboard };
