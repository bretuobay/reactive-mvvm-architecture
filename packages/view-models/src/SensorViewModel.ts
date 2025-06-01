import { RestfulApiViewModel } from "mvvm-core";
import { SensorModel } from "@repo/models";

import { SensorListSchema, SensorListData } from "@repo/models";

export class SensorViewModel extends RestfulApiViewModel<
  SensorListData,
  typeof SensorListSchema
> {
  constructor(model: SensorModel) {
    super(model);
  }
}
