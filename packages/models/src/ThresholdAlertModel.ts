import { RestfulApiModel, Fetcher } from "mvvm-core";
import { z } from "zod";
import { ThresholdAlertSchema } from "./schemas/alert.schema";
import { ThresholdAlertResponseDTO } from "./dtos/dtos"; // This DTO matches the structure of z.infer<typeof ThresholdAlertSchema>
import { nativeFetcher } from "./utils/fetcher";

export class ThresholdAlertModel extends RestfulApiModel<
  ThresholdAlertResponseDTO[], // TData is an array of threshold alerts
  typeof ThresholdAlertSchema // TSchema is the schema for a single threshold alert
> {
  constructor(baseUrl?: string, fetcher: Fetcher = nativeFetcher) {
    const effectiveBaseUrl = baseUrl || process.env.API_BASE_URL || "/api";
    super({
      baseUrl: effectiveBaseUrl,
      endpoint: "threshold-alerts", // Specific endpoint for threshold alerts
      fetcher: fetcher,
      schema: ThresholdAlertSchema, // Schema for validating a single threshold alert
      initialData: [], // Initial data is an empty array
    });
  }

  // Add any custom methods specific to threshold alerts if needed
  // For example, fetching alerts for a specific greenhouse or sensor type
  // async fetchAlertsForGreenhouse(greenhouseId: number): Promise<void> {
  //   const url = `${this.getUrl()}?greenhouseId=${greenhouseId}`;
  //   try {
  //     const fetchedData = await (this as any).executeApiRequest( // cast to any for private method
  //       url,
  //       { method: "GET" },
  //       "collection"
  //     );
  //     this.setData(fetchedData);
  //   } catch (error) {
  //     // Error handling
  //   }
  // }
}
