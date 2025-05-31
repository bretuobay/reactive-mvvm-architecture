import { z } from "zod";

export const SensorTypeEnum = z.enum([
  "temperature",
  "humidity",
  "soilMoisture",
  "lightIntensity",
]);
export const SensorStatusEnum = z.enum(["active", "inactive"]);

export const CreateSensorSchema = z.object({
  type: SensorTypeEnum,
  status: SensorStatusEnum,
  greenhouseId: z.number().int().positive(),
});

export type SensorDTO = z.infer<typeof CreateSensorSchema>;
