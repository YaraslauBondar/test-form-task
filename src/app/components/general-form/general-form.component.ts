import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormApiService } from '../../services/form-api.service';
import { IFormInput, IFormNumber, IFormSelect, IFormText } from '../../interfaces/form-field.interface';
import { FormFieldTypeEnum } from '../../enums/form-field.enum';
import { ActivatedRoute } from '@angular/router';
import { atLeastOneCheckboxCheckedValidator } from '../../validators/at-least-one-checked.validator';
import { setValidator } from '../../validators/set-validators';

@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styleUrl: './general-form.component.scss'
})
export class GeneralFormComponent implements OnInit {
  fields: Array<IFormSelect | IFormText | IFormNumber> = [];
  testForm!: FormGroup;

  public isEdit!: boolean;

  protected readonly FormFieldTypeEnum = FormFieldTypeEnum;

  constructor(
    private fb: FormBuilder,
    private formService: FormApiService,
    protected route: ActivatedRoute,
  ) {
    this.testForm = this.fb.group({});
    this.isEdit = this.route.snapshot.url.toString() === 'edit';
  }

  ngOnInit() {
    this.formService.getFormConfig().subscribe((fields) => {
      this.fields = fields;

      this.buildForm();

      this.isEdit ? this.getFormToEdit() : null;
    });
  }

  buildForm() {
    this.fields.forEach(field => {

      switch (field.type) {
        case FormFieldTypeEnum.checkbox: {
          this.buildCheckboxForm(field);
          return;
        }
        case FormFieldTypeEnum.select: {
          this.buildSelectForm(field);
          return;
        }
        case FormFieldTypeEnum.number: {
          this.buildInputForm(field);
          return;
        }
        case FormFieldTypeEnum.input: {
          this.buildInputForm(field);
          return;
        }
      }
    });
  }

  buildCheckboxForm(field: IFormSelect): void {
    this.testForm.addControl(field.model,
      this.fb.array(field.choices.map(el => false)));
    this.testForm.get(field.model)?.setValidators(atLeastOneCheckboxCheckedValidator());
  }

  buildSelectForm(field: IFormSelect) {
    this.testForm.addControl(field.model,
      this.fb.control('', field.required ? Validators.required : null));
  }

  buildInputForm(field: IFormText | IFormNumber) {
    let validators: ValidatorFn[] = [];
    field.required ? validators.push(Validators.required) : null;
    field.validators?.forEach(({type, value}) => {
      validators.push(setValidator[type](value));
    })
    this.testForm.addControl(field.model,
      this.fb.array([this.fb.control('', validators)]));
  }

  getFormToEdit() {
    this.formService.getEditFormConfig().subscribe(value => {
      this.setEditValue(value);
    })
  }

  setEditValue(value: any) {
    this.fields.forEach(field => {

      if(field.type === FormFieldTypeEnum.checkbox) {
        this.setCheckboxValue(field, value[field.model]);

      } else if(field.type === FormFieldTypeEnum.select) {
        this.setSelectValue(field, value[field.model]);

      } else if(Array.isArray(value[field.model])) {
        this.setInputValueWithAdd(field as IFormInput, value[field.model]);

      } else {
        this.setInputValueWithoutAdd(field as IFormInput, value[field.model]);
      }
    })
  }

  setCheckboxValue(field: IFormSelect, value: string[]): void {
    this.testForm.get(field.model)?.patchValue(field.choices
      .map(el => value.includes(el))
    )
  }

  setSelectValue(field: IFormSelect, value: string): void {
    this.testForm.get(field.model)?.patchValue(value);
  }

  setInputValueWithoutAdd(field: IFormInput, value: number | string): void {
    this.testForm.get(field.model)?.patchValue([value]);
  }

  setInputValueWithAdd(field: IFormInput, value: number[] | string[]): void {
    let array: FormArray = this.testForm.get(field.model) as FormArray;

    value.forEach((el, i) => {
      i === 0 ?
        array.controls[i].patchValue(el)
        : array.push(this.fb.control(el, field.required ? Validators.required : null));
    })
  }

  getFormArray(model: string): FormArray {
    return this.testForm.get(model) as FormArray;
  }

  getFormControl(model: string): FormControl {
    return this.testForm.get(model) as FormControl;
  }

  getInputField(field: IFormText | IFormNumber | IFormSelect): IFormText | IFormNumber {
    return field as IFormText | IFormNumber;
  }

  getSelectField(field: IFormText | IFormNumber | IFormSelect): IFormSelect{
    return field as IFormSelect;
  }

  getCheckboxValues(model: string, choices: string[]): string[] {
    let selectedChoices: string[] = [];
    this.testForm.get(model)?.value.map((el: any, i: number) => {
      el ? selectedChoices.push(choices[i]) : null;
    })
    return selectedChoices;
  }

  checkArrayValues(value: (string | number | null)[]): string | number | (string | number)[] {
    let array: (string | number)[] = value
      .filter(el => el !== null)
      .filter(el => el !== '');
    return array.length === 1 ? array[0] : array;
  }

  onSubmit() {
    if (this.testForm.valid) {
      let finalForm = this.testForm.value;
      this.fields.forEach(field => {
        if(field.type === FormFieldTypeEnum.checkbox) {
          finalForm[field.model] = this.getCheckboxValues(field.model, field.choices)
        } else if(Array.isArray(this.testForm.get(field.model)?.value)) {
          finalForm[field.model] = this.checkArrayValues(this.testForm.get(field.model)?.value);
        }
      })
      console.log('form', this.testForm.getRawValue());
    }
  }
}
