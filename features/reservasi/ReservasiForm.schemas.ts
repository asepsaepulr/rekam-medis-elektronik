import { z } from 'zod';

const reservasiFormSchemas = z.object({
  jenisKunjungan: z.number(),
  typeRawat: z.number(),
  triase: z.string(),
  namaPasien: z.string(),
  noRekamMedis: z.string(),
  kategoriPasien: z.string(),
  tanggalLahir: z.string(),
  jenisKelamin: z.number(),
  alamat: z.string(),
  nomorTelepon: z.string(),
  email: z.string(),
  polikliniks: z.string(),
  layanans: z.string(),
  Idnakes: z.string(),
  tanggalKonsultasi: z.string(),
  jamKonsultasi: z.string(),
  jamSlot: z.string(),
});

export default reservasiFormSchemas;
