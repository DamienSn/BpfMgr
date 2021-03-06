const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { logger } = require("./logs/logger");

// Import middlewares
const { checkUser, requireAuth } = require("./middlewares/auth.middleware");
const logRequests = require("./middlewares/access.middleware");

// Require routes
const userRoutes = require("./routes/user.routes.js");
const citiesRoutes = require("./routes/cities.routes.js");
const bpfRoutes = require("./routes/bpf.routes");
const bcnRoutes = require("./routes/bcn.routes");
const provinceRoutes = require("./routes/province.routes");

const app = express();

const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ["sessionId", "Content-Type", "x-api-key"],
    exposedHeaders: ["sessionId"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
};
app.use(cors(corsOptions));

// Convert body to JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// Access logs with logRequests middleware
app.use(logRequests);

//static (uploads)
app.use("/static", express.static("public"));

// jwt
app.get("*", checkUser);
app.get("/users/jwtid", requireAuth, (req, res) => {
    res.status(200).json({ message: "success", id: res.locals.user.user_id });
});

// Check api key
app.use(/\/((?!static).)*/, (req, res, next) => {
    const apiKey = req.get("x-api-key");
    if (!apiKey || apiKey !== process.env.BPFMGR_API_KEY) {
        res.status(401).json({ error: "unauthorised" });
    } else {
        next();
    }
});

// routes
app.get("/", (req, res) => {
    res.json({ message: "BpfMgr API v1" });
});

app.use("/users", userRoutes);
app.use("/cities", citiesRoutes);
app.use("/bpf", bpfRoutes);
app.use("/bcn", bcnRoutes);
app.use("/provinces", provinceRoutes);

console.log(process.env.CLIENT_URL);

// server
app.listen(PORT, () => {
    logger.info(`Server listening at port ${PORT}`);
});