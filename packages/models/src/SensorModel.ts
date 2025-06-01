import { RestfulApiModel } from "mvvm-core";
import { nativeFetcher } from "./utils/fetcher";
import { SensorListSchema, type SensorListData } from "./schemas";
import { API_BASE_URL } from "./config";
import { apiRegistry } from "./services/services";

const { path } = apiRegistry.sensor.list; // Assuming sensor.list path exists

const CONFIG = {
  baseUrl: API_BASE_URL,
  endpoint: path,
  fetcher: nativeFetcher,
  schema: SensorListSchema,
  initialData: [] as SensorListData,
};

export class SensorModel extends RestfulApiModel<
  SensorListData,
  typeof SensorListSchema
> {
  constructor() {
    super(CONFIG);
  }

  async fetch(id?: string | string[]): Promise<void> {
    console.log(`[SensorModel] Fetching data with id: ${id}`);
    try {
      await super.fetch(id);
      console.log('[SensorModel] Data after fetch:', this.data$.getValue());
    } catch (error) {
      console.error('[SensorModel] Error during fetch:', error);
    }
  }
}
