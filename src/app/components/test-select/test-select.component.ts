import { Component, Input} from '@angular/core';
import { FormControl } from '@angular/forms';
import { IFormSelect } from '../../interfaces/form-field.interface';

@Component({
  selector: 'app-test-select',
  templateUrl: './test-select.component.html',
  styleUrl: './test-select.component.scss'
})
export class TestSelectComponent {
  @Input() config!: IFormSelect;
  @Input() control!: FormControl<string>;

  public isOpen: boolean = false;

  constructor() {}

  openSelection() {
    this.isOpen = !this.isOpen;
  }

  selectValue(choice: string) {
    this.control.setValue(choice);
    this.isOpen = false;
  }
}
