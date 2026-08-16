const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();
const validate = require("../middleware/validate.middleware");
const brandSchema = require("../validators/brand.validator");

const {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} = require("../controllers/brand.controller");
/**
 * @swagger
 * /api/brands:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brands]
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
 *             properties:
 *               brandName:
 *                 type: string
 *                 example: Nike
 *               industry:
 *                 type: string
 *                 example: Sports
 *               tone:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - Bold
 *                   - Energetic
 *               platforms:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - Instagram
 *                   - LinkedIn
 *               description:
 *                 type: string
 *                 example: Global sportswear company
 *               logo:
 *                 type: string
 *                 example: https://logo.com/nike.png
 *     responses:
 *       201:
 *         description: Brand created successfully
 */
router.post("/", authMiddleware, validate(brandSchema), createBrand);
/**
 * @swagger
 * /api/brands:
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Brands fetched successfully
 */
router.get("/", authMiddleware, getBrands);
/**
 * @swagger
 * /api/brands/{id}:
 *   get:
 *     summary: Get brand by ID
 *     tags: [Brands]
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
 *         description: Brand fetched successfully
 */
router.get("/:id", authMiddleware, getBrandById);
/**
 * @swagger
 * /api/brands/{id}:
 *   put:
 *     summary: Update brand
 *     tags: [Brands]
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
 *         description: Brand updated successfully
 */
router.put(
  "/:id",
  authMiddleware,
  validate(brandSchema),
  updateBrand
);
/**
 * @swagger
 * /api/brands/{id}:
 *   delete:
 *     summary: Delete brand
 *     tags: [Brands]
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
 *         description: Brand deleted successfully
 */
router.delete("/:id", authMiddleware, deleteBrand);

module.exports = router;