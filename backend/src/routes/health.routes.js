const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/", (req, res) => {

    res.json({

        success: true,

        message: "Backend is Healthy 🚀"

    });

});

module.exports = router;