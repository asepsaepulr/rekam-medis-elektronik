import { z } from 'zod';
import {FIELD_MESSAGE} from "@/lib/errorMessages";
const { REQUIRED } = FIELD_MESSAGE;

const poliklinikFormSchemas = z.object({
  name: z.string().min(1, { message: REQUIRED('Poliklinik') }),
  desc: z.string().optional()
});

export default poliklinikFormSchemas;
