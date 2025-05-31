import { RestfulApiViewModel } from "mvvm-core";
import { SensorReadingModel } from "../../models/src/SensorReadingModel";
import { SensorReadingResponseDTO } from "../../models/src/dtos/dtos";
import { SensorReadingSchema } from "../../models/src/schemas/sensor-reading.schema";
import { z } from "zod";

export class SensorReadingViewModel extends RestfulApiViewModel<
  SensorReadingResponseDTO[], // TData is an array of SensorReadingResponseDTO
  typeof SensorReadingSchema // TSchema is the Zod schema for a single SensorReading
> {
  constructor(model: SensorReadingModel) {
    super(model);
  }

  // Add any view-specific logic or properties here if needed.
  // For example, methods to format sensor readings for display,
  // or to trigger specific actions based on selected readings.

  // Example: A method to get readings for a specific sensor ID from the current data
  // public getReadingsForSensor(sensorId: number): SensorReadingResponseDTO[] {
  //   const allReadings = this.model.data$.getValue(); // Get current data from the model
  //   if (!allReadings) {
  //     return [];
  //   }
  //   return allReadings.filter(reading => reading.sensorId === sensorId);
  // }
}
