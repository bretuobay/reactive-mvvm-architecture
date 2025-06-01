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
}
