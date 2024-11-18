import { Component, forwardRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseFormInputComponent } from '../base/form-input.component';


@Component({
  selector: 'app-test-input',
  templateUrl: './test-input.component.html',
  styleUrl: './test-input.component.scss',
  providers: [
    {provide: BaseFormInputComponent,
      useExisting: forwardRef(() => TestInputComponent)}
  ]
})
export class TestInputComponent extends BaseFormInputComponent {

  constructor(
    public override fb: FormBuilder
  ) {
    super(fb);
  }

}
