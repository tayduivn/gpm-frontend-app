import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  static state = [
    'Pending',
    'Sending',
    'Completed',
    'Cancelled',
  ];

  constructor() {
  }

  static formDate(today) {
    return new Date(today).toLocaleDateString('es-ES');
  }

  static getError(formGroup, controlName: string): string {
    let error = '';
    const control = formGroup.get(controlName);
    if (control.errors !== null) {
      if (control.errors.required === true) {
        error = 'Campo requerido';
      } else if (control.errors.email) {
        error = 'Correo invalido';
      }
    }
    return error;
  }
}
