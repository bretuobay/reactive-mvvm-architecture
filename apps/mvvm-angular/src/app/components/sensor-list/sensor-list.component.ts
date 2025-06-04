import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Replaced NgFor, NgClass
import { sensorViewModel, SensorListData } from '@repo/view-models/src/SensorViewModel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sensor-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sensor-list.component.html',
  styleUrl: './sensor-list.component.scss'
})
export class SensorListComponent {
  public vm = sensorViewModel;
  public data$: Observable<SensorListData | null>;
  public loading$: Observable<boolean>;
  public error$: Observable<any>;

  constructor() {
    this.data$ = this.vm.data$;
    this.loading$ = this.vm.loading$;
    this.error$ = this.vm.error$;

    if (typeof (this.vm as any).fetch === 'function') {
      (this.vm as any).fetch();
    } else if (typeof (this.vm as any).load === 'function') {
      (this.vm as any).load();
    }
  }

  // Keep getStatusClass or adapt if status is directly on sensor items
  // This depends on the structure of items in SensorListData
  getStatusClass(status: string | undefined): string {
    if (!status) return '';
    switch (status.toLowerCase()) {
      case 'online':
        return 'status-online';
      case 'offline':
        return 'status-offline';
      case 'error':
        return 'status-error';
      default:
        return '';
    }
  }
}
