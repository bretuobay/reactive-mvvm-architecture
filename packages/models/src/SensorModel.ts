import { RestfulApiModel } from "mvvm-core";
import { CreateSensorSchema } from "./schemas";
import { nativeFetcher } from "./utils/fetcher";
import { z } from "zod";
import { SensorDTO } from "./schemas";
export class SensorModel extends RestfulApiModel<
  SensorDTO[],
  z.infer<typeof CreateSensorSchema>
> {
  constructor() {
    super(
      "api/sensors",
      "api/sensors",
      nativeFetcher,
      z.array(CreateSensorSchema)
    );
  }
}
