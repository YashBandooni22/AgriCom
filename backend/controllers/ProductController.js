import itemModel from '../models/itemModel.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import purchaseModel from '../models/purchaseModel.js';

const changeAvailability = async (req, res) => {
    try {
        const { itemId } = req.body;

        const itemData = await itemModel.findById(itemId);
        await itemModel.findByIdAndUpdate(itemId, { available: !itemData.available });
        res.json({ success: true, message: 'Availability Changed!' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const itemList = async (req, res) => {
    try {
        const items = await itemModel.find({}).select(['-password', '-email']);
        res.json({ success: true, items });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API for item owner login (if items have owners) — else adapt as needed
const loginItemOwner = async (req, res) => {
    try {
        const { email, password } = req.body;
        const itemOwner = await itemModel.findOne({ email });

        if (!itemOwner) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, itemOwner.password);

        if (isMatch) {
            const token = jwt.sign({ id: itemOwner._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get item purchases for item owner panel
const purchasesItemOwner = async (req, res) => {
    try {
        const { itemId } = req.body;
        const purchases = await purchaseModel.find({ itemId });

        res.json({ success: true, purchases });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to mark purchase completed for item owner panel
const purchaseComplete = async (req, res) => {
    try {
        const { itemId, purchaseId } = req.body;

        const purchaseData = await purchaseModel.findById(purchaseId);

        if (purchaseData && purchaseData.itemId === itemId) {
            await purchaseModel.findByIdAndUpdate(purchaseId, { isCompleted: true });
            return res.json({ success: true, message: "Purchase Completed" });
        } else {
            return res.json({ success: false, message: "Mark Failed" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to cancel purchase for item owner panel
const purchaseCancel = async (req, res) => {
    try {
        const { itemId, purchaseId } = req.body;

        const purchaseData = await purchaseModel.findById(purchaseId);

        if (purchaseData && purchaseData.itemId === itemId) {
            await purchaseModel.findByIdAndUpdate(purchaseId, { cancelled: true });
            return res.json({ success: true, message: "Purchase Cancelled" });
        } else {
            return res.json({ success: false, message: "Cancellation Failed" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get dashboard data for item owner panel
const itemOwnerDashboard = async (req, res) => {
    try {
        const { itemId } = req.body;
        const purchases = await purchaseModel.find({ itemId });

        let earnings = 0;

        purchases.forEach((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount;
            }
        });

        let customers = [];

        purchases.forEach((item) => {
            if (!customers.includes(item.userId)) {
                customers.push(item.userId);
            }
        });

        const dashData = {
            earnings,
            purchases: purchases.length,
            customers: customers.length,
            latestPurchases: purchases.reverse().slice(0, 5)
        };

        res.json({ success: true, dashData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get the item profile for item owner panel
const itemProfile = async (req, res) => {
    try {
        const { itemId } = req.body;
        const profileData = await itemModel.findById(itemId).select("-password");

        res.json({ success: true, profileData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to update item profile data from item owner panel
const updateItemProfile = async (req, res) => {
    try {
        const { itemId, price, address, available } = req.body;

        await itemModel.findByIdAndUpdate(itemId, { price, address, available });

        res.json({ success: true, message: "Profile Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    changeAvailability,
    itemList,
    loginItemOwner,
    purchasesItemOwner,
    purchaseComplete,
    purchaseCancel,
    itemOwnerDashboard,
    itemProfile,
    updateItemProfile
};
