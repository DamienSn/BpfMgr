const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { logger } = require("./logs/logger");
const path = require("path");

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

if(process.env.NODE_ENV === "production") {
    console.log("Production config")
    app.use(express.static("public"));
    app.use("/api/", cors(corsOptions));
} else {
    app.use(cors(corsOptions));
}

// Convert body to JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// Access logs with logRequests middleware
app.use(logRequests);

//static (uploads)
app.use("/static/uploads", express.static("public/uploads"));

// jwt
app.get(`${process.env.API_PREFIX}*`, checkUser);
app.get(`${process.env.API_PREFIX}/users/jwtid`, requireAuth, (req, res) => {
    res.status(200).json({ message: "success", id: res.locals.user.user_id });
});

// Check api key
app.use(process.env.API_PREFIX || "/*", (req, res, next) => {
    const apiKey = req.get("x-api-key");
    if (!apiKey || apiKey !== process.env.BPFMGR_API_KEY) {
        res.status(401).json({ error: "unauthorised" });
    } else {
        next();
    }
});

// routes
app.get(`${process.env.API_PREFIX}/`, (req, res) => {
    res.json({ message: "BpfMgr API v1" });
});

app.use(`${process.env.API_PREFIX}/users`, userRoutes);
app.use(`${process.env.API_PREFIX}/cities`, citiesRoutes);
app.use(`${process.env.API_PREFIX}/bpf`, bpfRoutes);
app.use(`${process.env.API_PREFIX}/bcn`, bcnRoutes);
app.use(`${process.env.API_PREFIX}/provinces`, provinceRoutes);

console.log(process.env.CLIENT_URL);

// server
app.listen(PORT, () => {
    logger.info(`Server listening at port ${PORT}`);
});