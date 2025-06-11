import { createReactiveViewModel, ViewModelFactoryConfig } from "mvvm-core";
import { config as modelConfig } from "../../models/src/GreenHouseModel";

import {
  type GreenhouseListData,
  GreenhouseListSchema,
} from "../../models/src/schemas";

type TConfig = ViewModelFactoryConfig<
  GreenhouseListData,
  typeof GreenhouseListSchema
>;

const config: TConfig = {
  modelConfig,
  schema: GreenhouseListSchema,
};

export const greenHouseViewModel = createReactiveViewModel(config);

export type { GreenhouseListData };
