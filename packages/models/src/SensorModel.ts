import { RestfulApiModel } from "mvvm-core";
import { CreateSensorSchema } from "./schemas";
import { nativeFetcher } from "./utils/fetcher";
import { z } from "zod";
import { SensorListSchema, type SensorListData } from "./schemas";
import { API_BASE_URL } from "./config";

const CONFIG = {
  baseUrl: API_BASE_URL,
  endpoint: "api/sensors",
  fetcher: nativeFetcher,
  schema: z.array(CreateSensorSchema),
  initialData: [] as SensorListData,
};

export class SensorModel extends RestfulApiModel<
  SensorListData,
  typeof SensorListSchema
> {
  constructor() {
    super(CONFIG);
  }
}
