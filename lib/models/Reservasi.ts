import mongoose from "mongoose";
import autopopulate from 'mongoose-autopopulate';

const { Schema } = mongoose;

const ReservasiSchema = new Schema({
  jenisKunjungan: Number,
  typeRawat: Number,
  triase: String,
  namaPasien: String,
  noRekamMedis: String,
  kategoriPasien: String,
  tanggalLahir: String,
  jenisKelamin: Number,
  alamat: String,
  nomorTelepon: String,
  email: String,
  polikliniks: { type: Schema.Types.ObjectId, ref: 'Poliklinik', autopopulate: true },
  layanans: { type: Schema.Types.ObjectId, ref: 'Layanan', autopopulate: true},
  Idnakes: String,
  tanggalKonsultasi: String,
  jamKonsultasi: String,
  jamSlot: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { toJSON: { getters: true } });

const Reservasi = mongoose.models.Reservasi || mongoose.model("Reservasi", ReservasiSchema);

export default Reservasi;
