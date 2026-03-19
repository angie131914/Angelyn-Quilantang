// validation.js
import express from "express";
import { body, validationResult } from "express-validator";

const app = express();
app.use(express.json());

app.post(
  "/register",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("username").notEmpty().trim().escape(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.json({ message: "Validation passed!" });
  }
);

app.listen(3001);
