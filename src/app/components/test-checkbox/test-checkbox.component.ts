import { Component, Input } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { IFormSelect } from '../../interfaces/form-field.interface';

@Component({
  selector: 'app-test-checkbox',
  templateUrl: './test-checkbox.component.html',
  styleUrl: './test-checkbox.component.scss'
})
export class TestCheckboxComponent {
  @Input() config!: IFormSelect;
  @Input() formArray!: FormArray<FormControl<boolean>>;

  isSelectedAll!: boolean;

  constructor() {}

  selectAll() {
    this.isSelectedAll = !this.isSelectedAll;
    this.formArray.controls.forEach(control => {
      control.setValue(this.isSelectedAll);
    })
  }
}
