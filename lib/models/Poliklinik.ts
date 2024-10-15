import mongoose from "mongoose";

const PoliklinikSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  desc: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
})

const Poliklinik = mongoose.models.Poliklinik || mongoose.model("Poliklinik", PoliklinikSchema);

export default Poliklinik;
