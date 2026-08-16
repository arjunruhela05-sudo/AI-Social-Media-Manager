const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

const {
    getDashboard
} = require("../controllers/dashboard.controller");
/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get dashboard analytics
 *     description: Returns analytics, KPIs, AI insights, platform statistics, and recent posts for the authenticated user.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware,getDashboard);

module.exports = router;