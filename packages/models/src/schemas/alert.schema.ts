import { z } from "zod";
import { SensorTypeEnum } from "./sensor.schema";

export const CreateThresholdAlertSchema = z.object({
  sensorType: SensorTypeEnum,
  minValue: z.number(),
  maxValue: z.number(),
  greenhouseId: z.number().int().positive(),
});

export type CreateThresholdAlertDTO = z.infer<
  typeof CreateThresholdAlertSchema
>;

// Schema for validating threshold alerts received from the server (includes ID)
export const ThresholdAlertSchema = CreateThresholdAlertSchema.extend({
  id: z.number().int().positive(),
});

export type ThresholdAlertDTO = z.infer<typeof ThresholdAlertSchema>;
