import { RestfulApiViewModel } from "mvvm-core";
import { ThresholdAlertModel } from "../../models/src/ThresholdAlertModel";
import { ThresholdAlertResponseDTO } from "../../models/src/dtos/dtos";
import { ThresholdAlertSchema } from "../../models/src/schemas/alert.schema";
import { z } from "zod";

export class ThresholdAlertViewModel extends RestfulApiViewModel<
  ThresholdAlertResponseDTO[], // TData is an array of ThresholdAlertResponseDTO
  typeof ThresholdAlertSchema // TSchema is the Zod schema for a single ThresholdAlert
> {
  constructor(model: ThresholdAlertModel) {
    super(model);
  }

  // Add any view-specific logic or properties here if needed.
  // For example, methods to filter alerts by severity or acknowledge them.
}
