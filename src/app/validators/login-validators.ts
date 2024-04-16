import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";

// export const loginFormValidators = {
//     usernameValidators: [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
//     passwordValidators: [Validators.required, Validators.minLength(8), Validators.maxLength(120)],
// };

export const loginForm = new FormGroup({
    username: new FormControl<string | null | undefined>(''),
    password: new FormControl<string | null | undefined>('')
});