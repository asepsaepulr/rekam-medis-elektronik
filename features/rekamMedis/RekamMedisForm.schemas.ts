import { z } from 'zod';

const rekamMedisFormSchemas = z.object({
  idPasien:z.string(),
  suhu:z.string(),
  nadi:z.string(),
  sistole:z.string(),
  diastole:z.string(),
  frekuensiPernapasan:z.string(),
  obatDiKonsumsi:z.string(),
  diagnosis:z.string(),
  resepObat:z.string(),
  keluhan: z.string(),
  riwayatPenyakit: z.string(),
  riwayatAlergi: z.string(),
  idNakes: z.string(),
  nakes: z.string(),
  noRekamMedis: z.string(),
});

export default rekamMedisFormSchemas;
