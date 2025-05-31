import { RestfulApiViewModel } from "mvvm-core";
import { GreenHouseModel } from "../../models/src/GreenHouseModel";
import { GreenhouseResponseDTO } from "../../models/src/dtos/dtos";
import { CreateGreenhouseSchema } from "../../models/src/schemas/greenhouse.schema";
import { z } from "zod";

export class GreenHouseViewModel extends RestfulApiViewModel<
  GreenhouseResponseDTO[],
  z.infer<typeof CreateGreenhouseSchema>
> {
  // Base properties can be added here
  constructor(model: GreenHouseModel) {
    super(model);
    // Initialization logic
  }

  // Base methods can be added here
  initialize(): void {
    // Placeholder for initialization logic
  }
}
