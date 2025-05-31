import { RestfulApiModel, Fetcher } from "mvvm-core";
import { z } from "zod";
import { SensorReadingSchema } from "./schemas/sensor-reading.schema";
import { SensorReadingResponseDTO } from "./dtos/dtos"; // This matches the structure of z.infer<typeof SensorReadingSchema>
import { nativeFetcher } from "./utils/fetcher";

// Define the expected type for a single sensor reading item (matches SensorReadingResponseDTO)
// SensorReadingResponseDTO is an interface, z.infer<typeof SensorReadingSchema> gives the actual Zod-inferred type.
// For TData, we should use the DTO if it's manually defined or the inferred type.
// Since SensorReadingResponseDTO is well-defined, we can use it for TData items.
// TSchema is SensorReadingSchema for validating individual items.

export class SensorReadingModel extends RestfulApiModel<
  SensorReadingResponseDTO[], // TData is an array of sensor readings
  typeof SensorReadingSchema // TSchema is the schema for a single sensor reading
> {
  constructor(baseUrl?: string, fetcher: Fetcher = nativeFetcher) {
    const effectiveBaseUrl = baseUrl || process.env.API_BASE_URL || "/api";
    super({
      baseUrl: effectiveBaseUrl,
      endpoint: "sensor-readings", // Specific endpoint for sensor readings
      fetcher: fetcher,
      schema: SensorReadingSchema, // Schema for validating a single sensor reading
      initialData: [], // Initial data is an empty array
    });
  }

  // Example of a custom method if needed, specific to sensor readings
  // async fetchReadingsForSensor(sensorId: number): Promise<void> {
  //   // Note: The base 'fetch' method in RestfulApiModel can take an ID or array of IDs.
  //   // For more complex filtering like by sensorId, you might need a custom method
  //   // or ensure your API supports query parameters that can be passed via fetch options.
  //   // This example shows a custom URL construction.
  //   const url = `${this.getUrl()}?sensorId=${sensorId}`; // Assumes API supports this query param
  //   try {
  //     // The type argument to executeApiRequest here is TData (SensorReadingResponseDTO[])
  //     // and the schema is already this.schema (SensorReadingSchema)
  //     const fetchedData = await (this as any).executeApiRequest( // cast to any to access private method
  //       url,
  //       { method: "GET" },
  //       "collection" // Expecting an array of readings, validated by z.array(this.schema)
  //     );
  //     this.setData(fetchedData);
  //   } catch (error) {
  //     // Error is set by executeApiRequest
  //     // console.error(`Failed to fetch readings for sensor ${sensorId}:`, error);
  //   }
  // }
}
