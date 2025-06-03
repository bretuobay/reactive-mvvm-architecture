import { RestfulApiViewModel } from "mvvm-core";
// import { GreenHouseModel } from "@repo/models";
import { GreenHouseModel } from "../../models/src/GreenHouseModel";

import { type GreenhouseListData, GreenhouseListSchema } from "../../models";

// Refactor  this so that we pass a config object to a function that has dataType and schema
// and model then the creates the GreenHouseViewModel and returns it as greenHouseViewModel

export class GreenHouseViewModel extends RestfulApiViewModel<
  GreenhouseListData,
  typeof GreenhouseListSchema
> {
  constructor(model: GreenHouseModel) {
    super(model);
    this.model = model;
  }
}

const greenHouseModel = new GreenHouseModel();
export const greenHouseViewModel = new GreenHouseViewModel(greenHouseModel);

export type { GreenhouseListData };
