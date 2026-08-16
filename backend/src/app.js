const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const brandRoutes = require("./routes/brand.routes");
const contentRoutes = require("./routes/content.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const replyRoutes = require("./routes/reply.routes");
const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const apiLimiter = require("./middleware/rateLimit.middleware");
const scheduleRoutes = require("./routes/schedule.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const compression = require("compression");
const app = express();


app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(compression());
app.use(apiLimiter);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Social Media Manager Backend Running 🚀",
  });
});

app.post("/test", (req, res) => {
    console.log("TEST BODY:", req.body);
    res.json(req.body);
});
// ✅ Register routes FIRST
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/brands", brandRoutes);

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/replies", replyRoutes);
app.use("/api/schedule", scheduleRoutes);

app.use("/api/content", contentRoutes);

// Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);


app.use(notFound);

// ✅ Finally error handler
app.use(errorHandler);

module.exports = app;

