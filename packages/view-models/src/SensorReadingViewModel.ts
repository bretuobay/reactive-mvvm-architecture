import { RestfulApiViewModel } from 'mvvm-core';
import { type SensorReadingListData, SensorReadingListSchema, SensorReadingModel } from '@repo/models';

export class SensorReadingViewModel extends RestfulApiViewModel<SensorReadingListData, typeof SensorReadingListSchema> {
  constructor(model: SensorReadingModel) {
    super(model);
    this.model = model;
  }
}

const sensorReadingModel = new SensorReadingModel();
export const sensorReadingViewModel = new SensorReadingViewModel(sensorReadingModel);

export type { SensorReadingListData };
