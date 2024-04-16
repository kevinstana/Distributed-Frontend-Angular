import { FormControl, FormGroup, Validators } from "@angular/forms";

export const createContractFormValidators = {
    afmValidators: [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(/^[0-9]+$/)],
    contractTextValidators: [Validators.required, Validators.minLength(10), Validators.maxLength(255)]
};

export const createContractForm = new FormGroup({
    afm1: new FormControl<string | null | undefined>('', createContractFormValidators.afmValidators),
    afm2: new FormControl<string | null | undefined>('', createContractFormValidators.afmValidators),
    afm3: new FormControl<string | null | undefined>('', createContractFormValidators.afmValidators),
    afm4: new FormControl<string | null | undefined>('', createContractFormValidators.afmValidators),
    text: new FormControl<string | null | undefined>('', createContractFormValidators.contractTextValidators)
});