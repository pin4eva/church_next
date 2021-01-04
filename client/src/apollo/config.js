require("dotenv").config();

const config = {
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost/test",
  SECRET: process.env.SECRET || "sljnldldldld",
  AUTH_USER: process.env.AUTH_USER,
  AUTH_PASS: process.env.AUTH_PASS,
};

module.exports = config;
