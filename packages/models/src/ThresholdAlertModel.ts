import { RestfulApiModel } from "mvvm-core";
import {
  ThresholdAlertListSchema,
  type ThresholdAlertListData,
} from "./schemas/alert.schema";
import { nativeFetcher } from "./utils/fetcher";
import { apiRegistry } from "./services/services";
import { API_BASE_URL } from "./config";

const { path } = apiRegistry.alert.list;

const CONFIG = {
  baseUrl: API_BASE_URL,
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
