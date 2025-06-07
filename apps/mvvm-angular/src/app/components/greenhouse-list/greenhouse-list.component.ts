import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // For NgFor, NgIf, AsyncPipe
import {
  greenHouseViewModel,
  GreenhouseListData,
} from '@repo/view-models/GreenHouseViewModel';

import { BackIconComponent } from '../back-icon/back-icon.component';

import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-greenhouse-list',
  standalone: true,
  imports: [CommonModule, BackIconComponent, RouterLink], // Replaced NgFor with CommonModule
  templateUrl: './greenhouse-list.component.html',
  styleUrl: './greenhouse-list.component.scss',
})
export class GreenhouseListComponent {
  public vm = greenHouseViewModel;
  public data$: Observable<GreenhouseListData | null>;
  public loading$: Observable<boolean>;
  public error$: Observable<any>;

  constructor() {
    this.data$ = this.vm.data$;
    this.loading$ = this.vm.isLoading$;
    this.error$ = this.vm.error$;

    // Data might have been fetched by the card component already if dashboard was visited first.
    // However, if this list component is loaded directly, a fetch might be needed.
    // RestfulApiViewModel should ideally be idempotent or handle multiple fetch calls gracefully.
    // if (typeof (this.vm as any).fetchCommand === 'function') {
    (this.vm as any).fetchCommand.execute();
    // } else if (typeof (this.vm as any).load === 'function') {
    // (this.vm as any).fetchCommand.execute();
    // }
  }
}
