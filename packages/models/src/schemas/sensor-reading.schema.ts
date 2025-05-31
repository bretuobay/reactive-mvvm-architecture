import { z } from "zod";

export const CreateSensorReadingSchema = z.object({
  sensorId: z.number().int().positive(),
  timestamp: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid timestamp format",
  }),
  value: z.number(),
});

export type CreateSensorReadingDTO = z.infer<typeof CreateSensorReadingSchema>;

// Schema for validating sensor readings received from the server (includes ID)
export const SensorReadingSchema = CreateSensorReadingSchema.extend({
  id: z.number().int().positive(),
});

export type SensorReadingDTO = z.infer<typeof SensorReadingSchema>;
