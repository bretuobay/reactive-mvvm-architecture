export class SensorViewModel {
  // Base properties for all sensor view models
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  // Base method to update sensor data
  update(data: any): void {
    // Implement in derived classes
  }
}
