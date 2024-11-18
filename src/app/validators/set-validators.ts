import { Validators } from '@angular/forms';

export const setValidator = {
  'min': (value: number)=> {
    return Validators.min(value)
  },
  'max': (value: number)=> {
    return Validators.max(value)
  },
  'minLength': (value: number)=> {
    return Validators.minLength(value)
  },
  'maxLength': (value: number)=> {
    return Validators.maxLength(value)
  },
}
