import * as dotenv from "dotenv";
dotenv.config();

export default {
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost/jointheirs",
  SECRET: "jhbdaksdknsdlmljndano",
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
};
