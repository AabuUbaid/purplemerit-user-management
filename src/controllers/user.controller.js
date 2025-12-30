const User = require("../models/User");
const bcrypt = require("bcrypt");

// GET own profile
exports.getProfile = async (req, res) => {
    res.json({ success: true, user: req.user });
};

// UPDATE full name & email
exports.updateProfile = async (req, res) => {
    const { fullName, email } = req.body;

    if (!fullName || !email) {
        return res.status(400).json({ success: false, message: "All fields required" });
    }

    // Prevent duplicate email
    const exists = await User.findOne({ email, _id: { $ne: req.user._id } });
    if (exists) {
        return res.status(409).json({ success: false, message: "Email already in use" });
    }

    req.user.fullName = fullName;
    req.user.email = email;
    await req.user.save();

    res.json({ success: true, message: "Profile updated successfully" });
};

// CHANGE password
exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({
            success: false,
            message: "All fields required"
        });
    }

    // Fetch user WITH password
    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: "Old password incorrect"
        });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({
        success: true,
        message: "Password changed successfully"
    });
};
