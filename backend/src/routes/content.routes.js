const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();
const validate = require("../middleware/validate.middleware");
const contentSchema = require("../validators/content.validator");

const {

    generateContent,

    getHistory,

    getContentById,

    deleteContent

} = require("../controllers/content.controller");
/**
 * @swagger
 * /api/content/generate:
 *   post:
 *     summary: Generate AI social media content
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brandName
 *               - industry
 *               - platform
 *               - topic
 *               - tone
 *             properties:
 *               brandName:
 *                 type: string
 *                 example: Nike
 *               industry:
 *                 type: string
 *                 example: Sports
 *               platform:
 *                 type: string
 *                 example: Instagram
 *               topic:
 *                 type: string
 *                 example: Launching Nike Air Zoom
 *               tone:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - Bold
 *                   - Energetic
 *     responses:
 *       200:
 *         description: AI content generated successfully
 */
router.post(
    "/generate",
    authMiddleware,
    validate(contentSchema),
    generateContent
);
/**
 * @swagger
 * /api/content/history:
 *   get:
 *     summary: Get generated content history
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Content history fetched
 */

router.get("/history",authMiddleware, getHistory);
/**
 * @swagger
 * /api/content/{id}:
 *   get:
 *     summary: Get generated content by ID
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Content fetched
 */
router.get("/:id",authMiddleware, getContentById);
/**
 * @swagger
 * /api/content/{id}:
 *   delete:
 *     summary: Delete generated content
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Content deleted
 */ 
router.delete("/:id", authMiddleware,deleteContent);



module.exports = router;