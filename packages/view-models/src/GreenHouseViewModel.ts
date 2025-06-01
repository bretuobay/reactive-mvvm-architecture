import { RestfulApiViewModel } from "mvvm-core";
// import { GreenHouseModel } from "@repo/models";
import { GreenHouseModel } from "../../models/src/GreenHouseModel";
import { Observable } from "rxjs";

import { type GreenhouseListData, GreenhouseListSchema } from "../../models";

export class GreenHouseViewModel extends RestfulApiViewModel<
  GreenhouseListData,
  typeof GreenhouseListSchema
> {
  public readonly greenHouses$: Observable<GreenhouseListData | null>;

  constructor(model: GreenHouseModel) {
    super(model);
    this.model = model;
    this.greenHouses$ = this.data$ as Observable<GreenhouseListData | null>;
  }
}

const greenHouseModel = new GreenHouseModel();
export const greenHouseViewModel = new GreenHouseViewModel(greenHouseModel);
