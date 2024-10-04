const express = require("express");
const { db, checkDatabaseConnection } = require("./models/index.js");
const userApi = require("./features/user/userApi.js");
const roleApi = require("./features/role/roleApi.js");
const authApi = require("./features/auth/authApi.js");
const { seedRoles } = require("./seeders/seedRoles.js");
const cors = require("cors");
const logger = require("./logger.js");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173", // ALLOW YOUR FRONTEND URL
  credentials: true, // ALLOW CREDENTIALS (COOKIES, AUTHORIZATION HEADERS)
};
app.use(cors(corsOptions));
app.use(cookieParser());

app.use((req, res, next) => {
  res.on("finish", () => {
    let logLevel = "info";

    if (res.statusCode >= 500) {
      logLevel = "error";
    } else if (res.statusCode >= 400) {
      logLevel = "warn";
    } else if (res.statusCode >= 300) {
      logLevel = "verbose";
    }

    logger.log(
      logLevel,
      `${req.method} ${req.originalUrl} - Status: ${res.statusCode}`
    );
  });

  next();
});

app.use("/api/v1/user", userApi);
app.use("/api/v1/role", roleApi);
app.use("/api/v1/auth", authApi);

checkDatabaseConnection();

db.sequelize.sync({ force: false }).then(async () => {
  // await seedRoles();
  console.log("Database connected");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
