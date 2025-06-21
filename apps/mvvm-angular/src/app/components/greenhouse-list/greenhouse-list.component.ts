// @ts-ignore
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GreenhouseListData, greenHouseViewModel } from '@repo/view-models/GreenHouseViewModel';
import { BackIconComponent } from '../back-icon/back-icon.component';
import { Observable, Subscription, tap } from 'rxjs';
import { RouterLink } from '@angular/router';

//  all needs fixing in mvvm-core
export type TGreenhouseFormData = GreenhouseListData & {
  id?: string; // Optional field for editing
  name: string;
};

@Component({
  selector: 'app-greenhouse-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BackIconComponent, RouterLink],
  templateUrl: './greenhouse-list.component.html',
  styleUrls: ['./greenhouse-list.component.scss'],
})
export class GreenhouseListComponent implements OnInit, OnDestroy {
  public vm = greenHouseViewModel;
  public greenhouses$: Observable<TGreenhouseFormData[] | null>;
  public loading$: Observable<boolean>;
  public error$: Observable<any>;

  greenhouseForm: FormGroup;
  editingGreenhouseId: string | null | undefined = null;
  greenhouses: TGreenhouseFormData[] = [];
  private greenhousesSubscription: Subscription | undefined;

  greenHouseSizeOptions = ['25sqm', '50sqm', '100sqm'] as const;

  constructor(private fb: FormBuilder) {
    this.greenhouseForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      size: ['', Validators.required],
      cropType: [''],
      id: [''], // Optional field for editing
    });
    // @ts-ignore
    this.greenhouses$ = this.vm.data$.pipe(tap((ghs) => (this.greenhouses = ghs || [])));
    this.loading$ = this.vm.isLoading$;
    this.error$ = this.vm.error$;
  }

  ngOnInit(): void {
    this.vm.fetchCommand.execute();
    this.greenhousesSubscription = this.greenhouses$.subscribe();
  }

  ngOnDestroy(): void {
    if (this.greenhousesSubscription) {
      this.greenhousesSubscription.unsubscribe();
    }
  }

  handleSubmit(): void {
    if (this.greenhouseForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const formDataValue = this.greenhouseForm.value;

    if (this.editingGreenhouseId) {
      // @ts-ignore
      const existingGreenhouse = this.greenhouses.find((gh) => gh.name === this.editingGreenhouseId);
      if (existingGreenhouse) {
        this.vm.updateCommand.execute({
          id: this.editingGreenhouseId,
          ...existingGreenhouse, // spread existing to keep other properties
          // @ts-ignore
          name: formDataValue.name,
          location: formDataValue.location,
          size: formDataValue.size,
          cropType: formDataValue.cropType,
        });
      }
    } else {
      // @ts-ignore
      const existingGreenhouseByName = this.greenhouses.find((gh) => gh.name === formDataValue.name);
      if (existingGreenhouseByName) {
        console.error('Greenhouse with this name already exists:', formDataValue.name);
        this.vm.updateCommand.execute({
          // @ts-ignore
          id: existingGreenhouseByName.id || '',
          ...existingGreenhouseByName,
          // @ts-ignore
          name: formDataValue.name,
          location: formDataValue.location,
          size: formDataValue.size,
          cropType: formDataValue.cropType,
        });
      } else {
        // @ts-ignore - known issue with single object vs array
        this.vm.createCommand.execute(formDataValue);
      }
    }

    this.greenhouseForm.reset();
    this.editingGreenhouseId = null;
  }

  handleUpdate(id?: string): void {
    if (!id) return;
    // @ts-ignore
    const greenhouse = this.greenhouses.find((gh) => gh.id === id);
    if (greenhouse) {
      // @ts-ignore
      this.editingGreenhouseId = greenhouse.id;
      this.greenhouseForm.patchValue({
        // @ts-ignore
        name: greenhouse.name,
        // @ts-ignore
        location: greenhouse.location,
        // @ts-ignore
        size: greenhouse.size,
        // @ts-ignore
        cropType: greenhouse.cropType || '',
      });
    } else {
      console.error('Greenhouse not found for update:', id);
    }
  }

  handleDelete(id?: string): void {
    if (!id) {
      console.error('No ID provided for deletion');
      return;
    }
    this.vm.deleteCommand.execute(id);
    // If the deleted greenhouse was being edited, reset the form
    if (this.editingGreenhouseId === id) {
      this.greenhouseForm.reset();
      this.editingGreenhouseId = null;
    }
  }
}
