import { RestfulApiModel } from "mvvm-core";
import { CreateGreenhouseSchema, GreenhouseDTO } from "./schemas";
import { nativeFetcher } from "./utils/fetcher";
import { z } from "zod";
import { apiRegistry } from "./services/services";

const { method, path } = apiRegistry.greenhouse.list;
export class GreenHouseModel extends RestfulApiModel<
  GreenhouseDTO[],
  z.infer<typeof CreateGreenhouseSchema>
> {
  constructor() {
    // api/greenhouses should come from the services.ts file
    super(
      path,
      "api/greenhouses",
      nativeFetcher,
      z.array(CreateGreenhouseSchema)
    );
  }
}
