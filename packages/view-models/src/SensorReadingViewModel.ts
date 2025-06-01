import { RestfulApiViewModel } from "mvvm-core";
import { SensorReadingModel } from "@repo/models";
import { SensorReadingListData, SensorReadingListSchema } from "@repo/models";

export class SensorReadingViewModel extends RestfulApiViewModel<
  SensorReadingListData,
  typeof SensorReadingListSchema
> {
  constructor(model: SensorReadingModel) {
    super(model);
  }
}
