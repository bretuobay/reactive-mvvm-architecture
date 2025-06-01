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

export type SensorData = z.infer<typeof CreateSensorSchema>;

export const SensorListSchema = z.array(CreateSensorSchema);
export type SensorListData = z.infer<typeof SensorListSchema>;
