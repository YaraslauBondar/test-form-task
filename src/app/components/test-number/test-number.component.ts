import { Component, forwardRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseFormInputComponent } from '../base/form-input.component';

@Component({
  selector: 'app-test-number',
  templateUrl: './test-number.component.html',
  styleUrl: './test-number.component.scss',
  providers:[
    {provide: BaseFormInputComponent,
      useExisting: forwardRef(() => TestNumberComponent)}
  ]
})
export class TestNumberComponent extends BaseFormInputComponent {

  constructor(
    public override fb: FormBuilder
  ) {
    super(fb)
  }

  valueUp(control: any) {
    control.setValue(++control.value);
  }

  valueDown(control: any) {
    control.setValue(--control.value);
  }
}
