import { FormArray, ValidatorFn } from '@angular/forms';

export function atLeastOneCheckboxCheckedValidator(): ValidatorFn {
  return function validate(formArray) {
    let checked = 0;

    (formArray as FormArray).controls.forEach(control => {
      if (control.value) {
        checked++
      }
    })

    if (checked < 1) {
      return {
        requireCheckboxToBeChecked: true,
      }
    }

    return null;
  }
}
