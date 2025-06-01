import { RestfulApiViewModel } from "mvvm-core";
import { SensorModel } from "../../models/src/SensorModel";
import { Observable } from "rxjs";

import { SensorListSchema, SensorListData } from "../../models";

export class SensorViewModel extends RestfulApiViewModel<
  SensorListData,
  typeof SensorListSchema
> {
  public readonly sensors$: Observable<SensorListData[] | null>;

  constructor(model: SensorModel) {
    super(model);
    this.sensors$ = this.data$ as Observable<SensorListData[] | null>;
  }
}

const sensorModel = new SensorModel();
export const sensorViewModel = new SensorViewModel(sensorModel);
