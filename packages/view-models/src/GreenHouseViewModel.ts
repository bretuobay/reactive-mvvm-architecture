import { RestfulApiViewModel } from "mvvm-core";
import { GreenHouseModel } from "@repo/models";

import { GreenhouseListData, GreenhouseListSchema } from "@repo/models";

export class GreenHouseViewModel extends RestfulApiViewModel<
  GreenhouseListData,
  typeof GreenhouseListSchema
> {
  constructor(model: GreenHouseModel) {
    super(model);
  }
}
