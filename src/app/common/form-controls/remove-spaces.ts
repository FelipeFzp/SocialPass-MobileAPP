import { AbstractControl } from '@angular/forms';

export function removeSpaces(control: AbstractControl) {
    if (control && control.value) {
        const withoutSpaces = control.value.replace(/ /g, '');
        control.value !== withoutSpaces && control.setValue(withoutSpaces);
    }
    return null;
}