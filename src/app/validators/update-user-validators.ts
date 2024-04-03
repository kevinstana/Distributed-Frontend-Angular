import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export function updateUserVerifyPassword(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const verifyPassword = formGroup.get('verifyPassword')?.value;

      if (!password && !verifyPassword) {
        return null;
      }
  
      if (password !== verifyPassword) {
        return { noMatch: true };
      }
  
      return null;
    };
}

export const updateUserFormValidators = {
    usernameValidators: [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
    passwordValidators: [Validators.minLength(8), Validators.maxLength(120)],
    verifyPasswordValidators: [Validators.minLength(8), Validators.maxLength(120)],
    emailValidators: [Validators.required, Validators.email, Validators.maxLength(50)],
    firstNameValidators: [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
    lastNameValidators: [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
    afmValidators: [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(/^[0-9]+$/)],
    amkaValidators: [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(/^[0-9]+$/)]
}

export const updateUserForm = new FormGroup({
    username: new FormControl<string | null | undefined>('', updateUserFormValidators.usernameValidators),
    password: new FormControl<string | null | undefined>('', updateUserFormValidators.passwordValidators),
    verifyPassword: new FormControl<string | null | undefined>('', updateUserFormValidators.verifyPasswordValidators),
    email: new FormControl<string | null | undefined>('', updateUserFormValidators.emailValidators),
    role1: new FormControl<boolean | null | undefined>(false),
    role2: new FormControl<boolean | null | undefined>(false),
    role3: new FormControl<boolean | null | undefined>(false),
    role4: new FormControl<boolean | null | undefined>(false),
    firstName: new FormControl<string | null | undefined>('', updateUserFormValidators.firstNameValidators),
    lastName: new FormControl<string | null | undefined>('', updateUserFormValidators.lastNameValidators),
    afm: new FormControl<string | null | undefined>('', updateUserFormValidators.afmValidators),
    amka: new FormControl<string | null | undefined>('', updateUserFormValidators.amkaValidators)
}, {validators: updateUserVerifyPassword()});