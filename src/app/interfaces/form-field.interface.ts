import { FormFieldTypeEnum } from '../enums/form-field.enum';

export interface IFormField {
  type: FormFieldTypeEnum;
  label: string;
  model: string;
  description?: string;
  required?: boolean;
}

export interface IFormSelect extends IFormField {
  type: FormFieldTypeEnum.select | FormFieldTypeEnum.checkbox
  choices: string[];
}

export interface IFormInput extends IFormField {
  width?: number;
  canAdd?: boolean;
  placeholder?: string;
}

export interface IFormText extends IFormInput {
  type: FormFieldTypeEnum.input;
  validators?: IValidatorString[]
}

export interface IFormNumber extends IFormInput {
  type: FormFieldTypeEnum.number;
  validators?: IValidatorNumber[]
}

export interface IValidatorString {
  type: 'maxLength' | 'minLength';
  value: number;
}

export interface IValidatorNumber {
  type: 'max' | 'min';
  value: number;
}
