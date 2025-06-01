import { RestfulApiViewModel } from "mvvm-core";
import { ThresholdAlertModel } from "@repo/models";
import { ThresholdAlertListData, ThresholdAlertListSchema } from "@repo/models";

export class ThresholdAlertViewModel extends RestfulApiViewModel<
  ThresholdAlertListData,
  typeof ThresholdAlertListSchema
> {
  constructor(model: ThresholdAlertModel) {
    super(model);
  }
}
