import { z } from "zod";

export const CreateSensorReadingSchema = z.object({
  sensorId: z.number().int().positive(),
  timestamp: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid timestamp format",
  }),
  value: z.number(),
});

export type CreateSensorReadingDTO = z.infer<typeof CreateSensorReadingSchema>;
