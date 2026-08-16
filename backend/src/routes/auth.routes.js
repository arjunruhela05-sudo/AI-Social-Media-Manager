const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();
const validate = require("../middleware/validate.middleware");

const {
    registerSchema,
    loginSchema
} = require("../validators/auth.validator");

const {
  register,
  login,
  getProfile,
} = require("../controllers/auth.controller");

// Public Routes
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Aditya Ruhela
 *               email:
 *                 type: string
 *                 example: aditya@gmail.com
 *               password:
 *                 type: string
 *                 example: Password123
 *               companyName:
 *                 type: string
 *                 example: Nike
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post(
    "/register",
    validate(registerSchema),
    register
);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: aditya@gmail.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post(
    "/login",
    validate(loginSchema),
    login
);

// Protected Route
/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get logged in user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched
 */
router.get("/profile", authMiddleware, getProfile);

module.exports = router;