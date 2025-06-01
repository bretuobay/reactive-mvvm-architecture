import { RestfulApiViewModel } from "mvvm-core";
import { SensorReadingModel } from "../../models/src/SensorReadingModel";
import { SensorReadingListData, SensorReadingListSchema } from "../../models";
import { Observable } from "rxjs";

export class SensorReadingViewModel extends RestfulApiViewModel<
  SensorReadingListData,
  typeof SensorReadingListSchema
> {
  public readonly sensorReadings$: Observable<
    SensorReadingListData[] | null
  >;
  constructor(model: SensorReadingModel) {
    super(model);
    this.sensorReadings$ = this.data$ as Observable<
      SensorReadingListData[] | null
    >;
  }
}

const sensorReadingModel = new SensorReadingModel();
export const sensorReadingViewModel = new SensorReadingViewModel(
  sensorReadingModel
);
