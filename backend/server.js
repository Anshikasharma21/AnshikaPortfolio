import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contact.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json()); // ✅ REQUIRED for req.body

// routes
app.use("/api/contact", contactRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});