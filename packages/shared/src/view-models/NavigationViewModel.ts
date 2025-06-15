import { ObservableCollection } from 'mvvm-core';

export type NavigationListData = {
  id: string;
  label: string;
  icon: string;
};

export class NavigationViewModel {
  private _navigationList: ObservableCollection<NavigationListData>;

  constructor() {
    this._navigationList = new ObservableCollection([
      { id: 'greenhouses', label: 'Greenhouses', icon: 'greenhouse' },
      { id: 'sensors', label: 'Sensors', icon: 'sensor' },
      { id: 'sensor-readings', label: 'Readings', icon: 'reading' },
      { id: 'threshold-alerts', label: 'Alerts', icon: 'alert' },
    ]);
  }

  get navigationList(): ObservableCollection<NavigationListData> {
    return this._navigationList;
  }
}

export const navigationViewModel = new NavigationViewModel();
