import express from "express";
import dotenv from "dotenv";

dotenv.config(); 
const app = express();

app.get("/config", (req, res) => {
  res.json({
    appName: process.env.APP_NAME,
    port: process.env.PORT,
    databaseURL: process.env.DATABASE_URL ? "Configured" : "Missing",
  });
});

app.listen(process.env.PORT || 3004);
