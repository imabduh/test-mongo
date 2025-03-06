const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3001;

// Koneksi ke MongoDB
mongoose
  .connect(
    "mongodb+srv://mabduh:ma23092002@cluster0.8dff2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Membuat Schema dan Model

// Endpoint GET untuk mengambil semua data
app.get("/", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const items = await db.collection("catalogs").find().toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
