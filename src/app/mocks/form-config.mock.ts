import { IFormNumber, IFormSelect, IFormText } from '../interfaces/form-field.interface';
import { FormFieldTypeEnum } from '../enums/form-field.enum';

export const formConfig: Array<IFormText | IFormNumber | IFormSelect> = [
  {
    type: FormFieldTypeEnum.input,
    label: 'Name',
    placeholder: 'Enter your name',
    required: true,
    model: 'name',
    width: 200,
    validators: [
      {
        type: 'minLength',
        value: 3
      },
      {
        type: 'maxLength',
        value: 10
      },
    ]
  },
  {
    type: FormFieldTypeEnum.input,
    label: 'Education',
    placeholder: 'Enter university',
    description: 'Universities where you studied',
    required: false,
    model: 'education',
    canAdd: true,
  },

  {
    type: FormFieldTypeEnum.select,
    label: 'Gender',
    description: 'Choose your gender',
    required: true,
    choices: ['Male', 'Female', 'Other'],
    model: 'gender',
  },

  {
    type: FormFieldTypeEnum.number,
    label: 'Age',
    placeholder: 'Enter your age',
    required: true,
    model: 'age',
    width: 70,
    validators: [
      {
        type: 'min',
        value: 0
      },
      {
        type: 'max',
        value: 100
      },
    ]
  },
  {
    type: FormFieldTypeEnum.number,
    label: 'Lucky number',
    required: false,
    model: 'lucky',
    width: 100,
    canAdd: true,
    description: 'Select your favourite numbers'
  },
  {
    type: FormFieldTypeEnum.checkbox,
    label: 'Food',
    required: true,
    model: 'food',
    choices: ['Pizza', 'Pasta', 'Burger', 'Sushi', 'Khinkali'],
  },
];
