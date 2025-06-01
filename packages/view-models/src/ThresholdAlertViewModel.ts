import { RestfulApiViewModel } from "mvvm-core";
import { ThresholdAlertModel } from "../../models/src/ThresholdAlertModel";
import { ThresholdAlertListData, ThresholdAlertListSchema } from "../../models";
import { Observable } from "rxjs";

export class ThresholdAlertViewModel extends RestfulApiViewModel<
  ThresholdAlertListData,
  typeof ThresholdAlertListSchema
> {
  public readonly thresholdAlerts$: Observable<
    ThresholdAlertListData[] | null
  >;
  constructor(model: ThresholdAlertModel) {
    super(model);
    this.thresholdAlerts$ = this.data$ as Observable<
      ThresholdAlertListData[] | null
    >;
  }
}

const thresholdAlertModel = new ThresholdAlertModel();
export const thresholdAlertViewModel = new ThresholdAlertViewModel(
  thresholdAlertModel
);
