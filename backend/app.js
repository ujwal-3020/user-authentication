const express = require("express");
const { db, checkDatabaseConnection } = require("./models/index.js");
const userApi = require("./features/user/userApi.js");
const roleApi = require("./features/role/roleApi.js");
const authApi = require("./features/auth/authApi.js");
const { seedRoles } = require("./seeders/seedRoles.js");
const cors = require("cors");

const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173", // ALLOW YOUR FRONTEND URL
  credentials: true, // ALLOW CREDENTIALS (COOKIES, AUTHORIZATION HEADERS)
};
app.use(cors(corsOptions));
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
