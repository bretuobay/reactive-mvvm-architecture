import { createReactiveViewModel, ViewModelFactoryConfig } from "mvvm-core";
import { config as modelConfig } from "@repo/models";
import { type GreenhouseListData, GreenhouseListSchema } from "@repo/models";

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
