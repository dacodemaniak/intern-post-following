import { AbstractControl, ValidatorFn, Validators } from "@angular/forms";

export type ControlType = {
  control: AbstractControl,
  validators: ValidatorFn[]
}
