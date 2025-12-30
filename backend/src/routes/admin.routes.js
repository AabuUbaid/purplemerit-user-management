const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const adminController = require("../controllers/admin.controller");

// Admin-only routes
router.get("/users", auth, role("admin"), adminController.getAllUsers);
router.put("/users/:id/activate", auth, role("admin"), adminController.activateUser);
router.put("/users/:id/deactivate", auth, role("admin"), adminController.deactivateUser);

module.exports = router;
