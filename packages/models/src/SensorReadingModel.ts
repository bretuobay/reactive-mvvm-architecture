import { RestfulApiModel } from "mvvm-core";
import {
  SensorReadingListSchema,
  type SensorReadingListData,
} from "./schemas/sensor-reading.schema";
import { nativeFetcher } from "./utils/fetcher";

import { apiRegistry } from "./services/services";
import { API_BASE_URL } from "./config";
const { path } = apiRegistry.reading.list;

const CONFIG = {
  baseUrl: API_BASE_URL,
  endpoint: path,
  fetcher: nativeFetcher,
  schema: SensorReadingListSchema,
  initialData: [] as SensorReadingListData,
};

export class SensorReadingModel extends RestfulApiModel<
  SensorReadingListData,
  typeof SensorReadingListSchema
> {
  constructor() {
    super(CONFIG);
  }

  async fetch(id?: string | string[]): Promise<void> {
    console.log(`[SensorReadingModel] Fetching data with id: ${id}`);
    try {
      await super.fetch(id);
      console.log('[SensorReadingModel] Data after fetch:', this.data$.getValue());
    } catch (error) {
      console.error('[SensorReadingModel] Error during fetch:', error);
    }
  }
}
