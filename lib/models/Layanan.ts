import mongoose from "mongoose";

const LayananSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  price: Number,
  idPoliklinik: mongoose.Schema.Types.ObjectId,
  typeRawat: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
})

const Layanan =mongoose.models.Layanan || mongoose.model("Layanan", LayananSchema);

export default Layanan;
