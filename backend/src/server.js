import express from "express";
import { router as apiRoutes } from "./routes/index.js";

const app = express();

app.use(express.json());

// หน้า Landing Page
app.get("/", (req, res) => {
  return res.send("Server is running successfully!🚀");
});

//เอา Routes เข้ากับ Prefix /api
app.use("/api", apiRoutes);

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  return res.status(500).json({
    error: "Something went wrong on the server ...😂",
    message: err.message,
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT} 🟢`);
});
