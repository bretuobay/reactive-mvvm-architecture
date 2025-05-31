import { z } from "zod";

export const CreateGreenhouseSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  size: z.string().min(1),
  cropType: z.string().optional(),
});

export type GreenhouseDTO = z.infer<typeof CreateGreenhouseSchema>;
