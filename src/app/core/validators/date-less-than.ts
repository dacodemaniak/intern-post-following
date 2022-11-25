import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

import * as moment from 'moment';

export class DateLessThan {
    public static dateLessThan(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {

            if (!control.value) return null;

            const today: moment.Moment = moment(); // Récupère la date du jour
            today.subtract(18, 'y');


            // Récupérer la valeur saisie
            const enteredDate: moment.Moment = moment(control.value);
            if (enteredDate.isAfter(today)) {
                return {dateLessThan: true};
            }
            return null;
        }
    }
}