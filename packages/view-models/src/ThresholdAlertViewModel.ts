import { RestfulApiViewModel } from "mvvm-core";
import { ThresholdAlertModel } from "../../models/src/ThresholdAlertModel";
import { ThresholdAlertListData, ThresholdAlertListSchema } from "../../models";

export class ThresholdAlertViewModel extends RestfulApiViewModel<
  ThresholdAlertListData,
  typeof ThresholdAlertListSchema
> {
  constructor(model: ThresholdAlertModel) {
    super(model);
    this.model = model;
  }
}

const thresholdAlertModel = new ThresholdAlertModel();
export const thresholdAlertViewModel = new ThresholdAlertViewModel(
  thresholdAlertModel
);
export type { ThresholdAlertListData };
