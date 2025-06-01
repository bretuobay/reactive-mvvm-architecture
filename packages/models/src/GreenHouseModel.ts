import { RestfulApiModel } from "mvvm-core";
import { GreenhouseListSchema, type GreenhouseListData } from "./schemas";
import { nativeFetcher } from "./utils/fetcher";
import { apiRegistry } from "./services/services";
import { API_BASE_URL } from "./config";

const { path } = apiRegistry.greenhouse.list;

const CONFIG = {
  baseUrl: API_BASE_URL,
  endpoint: path,
  fetcher: nativeFetcher,
  schema: GreenhouseListSchema,
  initialData: [],
};

export class GreenHouseModel extends RestfulApiModel<
  GreenhouseListData,
  typeof GreenhouseListSchema
> {
  constructor() {
    super(CONFIG);
  }
}
