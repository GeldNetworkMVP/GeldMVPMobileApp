import { ValidatorFn } from '@angular/forms';

import { DESIGNATIONS } from '@shared/constants/designations.constant';
export const matchValidator = (
  control1Name: string,
  control2Name: string
): ValidatorFn => {
  return (formGroup) => {
    const control = formGroup.get(control1Name);
    const matchingControl = formGroup.get(control2Name);

    if (!control || !matchingControl) {
      return null;
    }

    if (control.value !== matchingControl.value) {
      return { mismatchedPasswords: true };
    } else {
      return null;
    }
  };
};


export const designationValidator = (): ValidatorFn => {
  return (control) => {
    if (!DESIGNATIONS.includes(control.value)) {
      return { invalidDesignation: true };
    } else {
      return null;
    }
  };
}