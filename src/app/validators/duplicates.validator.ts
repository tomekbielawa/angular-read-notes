import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function duplicatesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    if (control.value) {
      const duplicates = control.value.find(tag => {
        const foundTags = control.value.filter(val => val.name === tag.name);

        if (foundTags.length > 1) {
          return true;
        }
      });

      return duplicates ? { duplicates: true } : null;
    }

    return null;
  };
}
