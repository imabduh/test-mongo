import express from "express";
import mongoose, { model, Schema } from "mongoose";

const app = express();
const PORT = 3001;

// Koneksi ke MongoDB
mongoose.connect(
    "mongodb+srv://mabduh:ma23092002@cluster0.8dff2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Membuat Schema dan Model

// Endpoint GET untuk mengambil semua data
const Catalog = new Schema(
  {
    name: { type: String, unique: true, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const CatalogModel = model("Catalog", Catalog);

app.get("/", async (req, res) => {
  try {
    const items = await CatalogModel.find()
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
