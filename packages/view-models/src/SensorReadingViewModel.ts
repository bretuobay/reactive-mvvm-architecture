import { RestfulApiViewModel } from "mvvm-core";
import { SensorReadingModel } from "../../models";
import { SensorReadingListData, SensorReadingListSchema } from "../../models";

export class SensorReadingViewModel extends RestfulApiViewModel<
  SensorReadingListData,
  typeof SensorReadingListSchema
> {
  constructor(model: SensorReadingModel) {
    super(model);
  }
}
