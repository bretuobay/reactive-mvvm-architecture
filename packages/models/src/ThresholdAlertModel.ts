import { RestfulApiModel } from "mvvm-core";
import {
  ThresholdAlertListSchema,
  type ThresholdAlertListData,
} from "./schemas/alert.schema";
import { nativeFetcher } from "./utils/fetcher";
import { apiRegistry } from "./services/services";

const { path } = apiRegistry.alert.list;

const CONFIG = {
  baseUrl: process.env.API_BASE_URL || "/api",
  endpoint: path,
  fetcher: nativeFetcher,
  schema: ThresholdAlertListSchema,
  initialData: [],
};

export class ThresholdAlertModel extends RestfulApiModel<
  ThresholdAlertListData,
  typeof ThresholdAlertListSchema
> {
  constructor() {
    super(CONFIG);
  }
}
