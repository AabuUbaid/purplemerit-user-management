const User = require("../models/User");

// GET all users with pagination
exports.getAllUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
        .select("-password")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    const total = await User.countDocuments();

    res.json({
        success: true,
        page,
        totalPages: Math.ceil(total / limit),
        users
    });
};

// ACTIVATE user
exports.activateUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    user.status = "active";
    await user.save();

    res.json({ success: true, message: "User activated" });
};

// DEACTIVATE user
exports.deactivateUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    user.status = "inactive";
    await user.save();

    res.json({ success: true, message: "User deactivated" });
};
