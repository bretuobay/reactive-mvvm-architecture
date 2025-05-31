import { RestfulApiViewModel } from "mvvm-core";
import { SensorModel } from "../../models/src/SensorModel";
import { SensorResponseDTO } from "../../models/src/dtos/dtos";
import { CreateSensorSchema } from "../../models/src/schemas/sensor.schema";
import { z } from "zod";

export class SensorViewModel extends RestfulApiViewModel<
  SensorResponseDTO[],
  z.infer<typeof CreateSensorSchema>
> {
  constructor(model: SensorModel) {
    super(model);
  }

  // Existing methods can be adapted or removed if their functionality
  // is covered by RestfulApiViewModel.
  // For example, the generic 'update(data: any)' might be replaced by
  // using the 'updateCommand' from RestfulApiViewModel,
  // which operates on specific item IDs and payloads.

  // If there are view-specific methods that don't map directly to CRUD,
  // they can be kept here.
}
