const express = require("express");
const app = express();
const PORT = 3000;

let currentId = 1;

// Middleware parse JSON
app.use(express.json());

// ==================
// 1. Logger Middleware
// ==================
app.use((req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.path}`);
  next();
});

// ==================
// 2. checkAge Middleware
// ==================
const checkAge = (req, res, next) => {
  const age = parseInt(req.query.age);

  if (!age || age < 18) {
    return res.status(400).json({
      message: "Tuổi phải >= 18",
    });
  }

  next();
};

// ==================
// 3. Routes
// ==================

// GET /api/info
app.get("/api/info", checkAge, (req, res) => {
  const { name, age } = req.query;

  res.json({
    name,
    age,
    message: `Xin chào ${name}, chào mừng bạn!`,
  });
});

// POST /api/register
app.post("/api/register", (req, res) => {
  const { name, age, email } = req.body;

  if (!name || !age || !email) {
    return res.status(400).json({
      message: "Vui lòng nhập đầy đủ thông tin",
    });
  }

  const user = {
    id: currentId++,
    name,
    age,
    email,
  };

  res.json({
    message: "Đăng ký thành công!",
    user,
  });
});

// ==================
// 4. Static file
// ==================
app.use(express.static("public"));

// ==================
app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
