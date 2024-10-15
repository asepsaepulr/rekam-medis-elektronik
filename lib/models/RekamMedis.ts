import mongoose from "mongoose";

const RekamMedisSchema = new mongoose.Schema({
  idPasien: String,
  namaPasien: String,
  suhu: String,
  nadi: String,
  sistole: String,
  diastole: String,
  frekuensiPernapasan: String,
  obatDiKonsumsi: String,
  diagnosis: String,
  resepObat: String,
  keluhan: String,
  riwayatPenyakit: String,
  riwayatAlergi: String,
  idNakes: String,
  nakes: String,
  noRekamMedis: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { toJSON: { getters: true } });

const RekamMedis = mongoose.models.RekamMedis || mongoose.model("RekamMedis", RekamMedisSchema);

export default RekamMedis;
