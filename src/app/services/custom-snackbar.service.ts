import {Injectable, NgZone} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class CustomSnackbarService {

  constructor(
    public snackBar: MatSnackBar,
    private zone: NgZone
  ) {
  }

  public open(errorText: string): void {
    this.zone.run(() => {
      setTimeout(() => {
        this.snackBar.open(errorText, 'ok', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }, 0);
    });
  }
}
