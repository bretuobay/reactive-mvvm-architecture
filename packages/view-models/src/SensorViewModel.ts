import { RestfulApiViewModel } from "mvvm-core";
import { SensorModel } from "../../models/src/SensorModel";
import { Observable } from "rxjs";

import { SensorListSchema, SensorListData } from "../../models";

export class SensorViewModel extends RestfulApiViewModel<
  SensorListData,
  typeof SensorListSchema
> {
  constructor(model: SensorModel) {
    super(model);
    this.model = model;
  }
}

const sensorModel = new SensorModel();
export const sensorViewModel = new SensorViewModel(sensorModel);
