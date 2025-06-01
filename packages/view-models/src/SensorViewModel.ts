import { RestfulApiViewModel } from "mvvm-core";
import { SensorModel } from "../../models/src/SensorModel";

import { SensorListSchema, SensorListData } from "../../models";

export class SensorViewModel extends RestfulApiViewModel<
  SensorListData,
  typeof SensorListSchema
> {
  constructor(model: SensorModel) {
    super(model);
  }
}

const sensorModel = new SensorModel();
export const sensorViewModel = new SensorViewModel(sensorModel);
