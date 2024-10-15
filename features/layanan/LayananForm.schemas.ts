import { z } from 'zod';

const layananFormSchemas = z.object({
  name: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  price: z.coerce.number().min(0.1),
  idPoliklinik: z.string(),
  typeRawat: z.number(),
});

export default layananFormSchemas;
