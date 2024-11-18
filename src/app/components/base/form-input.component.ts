import { Directive, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { setValidator } from '../../validators/set-validators';
import { IFormNumber, IFormText } from '../../interfaces/form-field.interface';

@Directive()
export abstract class BaseFormInputComponent {
  @Input() config!: IFormNumber | IFormText;
  @Input() formArray!: FormArray<FormControl<number | string | null>>;

  protected constructor(
    public fb: FormBuilder
  ) {}

  addInput() {
    let validators: ValidatorFn[] = [];
    this.config.required ? validators.push(Validators.required) : null;

    this.config?.validators?.forEach(({type, value}) => {
      validators.push(setValidator[type](value));
    });

    this.formArray.push(this.fb.control(null, validators));
  }

  removeInput(index: number) {
    if (this.formArray.length > 1) {
      this.formArray.removeAt(index);
    }
  }
}
