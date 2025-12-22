const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

// Ganti dengan MongoDB Atlas connection string kamu
mongoose.connect("mongodb+srv://galang29hot_db_user:43A8krY4vomc2zkp@cluster0.w4vr4ai.mongodb.net/natu")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
