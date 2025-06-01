import { RestfulApiViewModel } from "mvvm-core";
import { ThresholdAlertModel } from "../../models";
import { ThresholdAlertListData, ThresholdAlertListSchema } from "../../models";

export class ThresholdAlertViewModel extends RestfulApiViewModel<
  ThresholdAlertListData,
  typeof ThresholdAlertListSchema
> {
  constructor(model: ThresholdAlertModel) {
    super(model);
  }
}
