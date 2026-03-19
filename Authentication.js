import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const app = express();
app.use(express.json());

const user = { id: 1, username: "admin", passwordHash: bcrypt.hashSync("123456", 8) };
const SECRET_KEY = "your_jwt_secret";

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username !== user.username || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    req.user = jwt.verify(token, SECRET_KEY);
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};

app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: `Welcome, user ${req.user.id}` });
});

app.listen(3000);
