import { RestfulApiViewModel } from "mvvm-core";
import { SensorReadingModel } from "../../models/src/SensorReadingModel";
import { SensorReadingListData, SensorReadingListSchema } from "../../models";

export class SensorReadingViewModel extends RestfulApiViewModel<
  SensorReadingListData,
  typeof SensorReadingListSchema
> {
  constructor(model: SensorReadingModel) {
    super(model);
    this.model = model;
  }
}

const sensorReadingModel = new SensorReadingModel();
export const sensorReadingViewModel = new SensorReadingViewModel(
  sensorReadingModel
);

export type { SensorReadingListData };
