const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

const {
  generateReply,
} = require("../controllers/reply.controller");

/**
 * @swagger
 * /api/replies/generate:
 *   post:
 *     summary: Generate an AI reply for a social media comment
 *     description: Uses Gemini AI to generate a contextual reply based on the provided comment and tone.
 *     tags: [Replies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comment
 *             properties:
 *               comment:
 *                 type: string
 *                 example: Your new shoes look amazing!
 *               tone:
 *                 type: string
 *                 example: Friendly
 *     responses:
 *       200:
 *         description: AI reply generated successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router.post("/generate", authMiddleware, generateReply);

module.exports = router;