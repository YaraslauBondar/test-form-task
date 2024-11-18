import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IFormNumber, IFormSelect, IFormText } from '../interfaces/form-field.interface';
import { formConfig } from '../mocks/form-config.mock';
import { editFormConfig } from '../mocks/edit-form.config.mock';

@Injectable({
  providedIn: 'root'
})
export class FormApiService {

  constructor() { }

  getFormConfig(): Observable<Array<IFormSelect | IFormText | IFormNumber>> {
    return of(formConfig);
  }

  getEditFormConfig(): Observable<any> {
    return of(editFormConfig);
  }
}
