const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();
const validate = require("../middleware/validate.middleware");
const scheduleSchema = require("../validators/schedule.validator");

const {
  schedulePost,
  getScheduledPosts,
  getScheduledPostById,
  updateScheduledPost,
  deleteScheduledPost,
} = require("../controllers/schedule.controller");
/**
 * @swagger
 * /api/schedule:
 *   post:
 *     summary: Schedule a social media post
 *     tags: [Schedule]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contentId
 *               - platform
 *               - scheduledDate
 *             properties:
 *               contentId:
 *                 type: string
 *                 example: 6a7442cbd7577de6de9a70be
 *               platform:
 *                 type: string
 *                 example: Instagram
 *               scheduledDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-08-10T09:00:00.000Z
 *               status:
 *                 type: string
 *                 example: Scheduled
 *     responses:
 *       201:
 *         description: Post scheduled successfully
 */
router.post(
    "/",
    authMiddleware,
    validate(scheduleSchema),
    schedulePost
);

/**
 * @swagger
 * /api/schedule:
 *   get:
 *     summary: Get all scheduled posts
 *     tags: [Schedule]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Scheduled posts fetched successfully
 */
router.get("/", authMiddleware,getScheduledPosts);
/**
 * @swagger
 * /api/schedule/{id}:
 *   get:
 *     summary: Get a scheduled post by ID
 *     tags: [Schedule]
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
 *         description: Scheduled post fetched successfully
 */
router.get("/:id",authMiddleware, getScheduledPostById);
/**
 * @swagger
 * /api/schedule/{id}:
 *   put:
 *     summary: Update a scheduled post
 *     tags: [Schedule]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contentId:
 *                 type: string
 *               platform:
 *                 type: string
 *               scheduledDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Scheduled post updated successfully
 */
router.put(
    "/:id",
    authMiddleware,
    validate(scheduleSchema),
    updateScheduledPost
);
/**
 * @swagger
 * /api/schedule/{id}:
 *   delete:
 *     summary: Delete a scheduled post
 *     tags: [Schedule]
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
 *         description: Scheduled post deleted successfully
 */
router.delete("/:id", authMiddleware,deleteScheduledPost);

module.exports = router;