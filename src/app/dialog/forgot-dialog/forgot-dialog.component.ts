import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {UtilsService} from '../../services/utils.service';
import {FirebaseAuthService} from '../../services/firebase/firebase-auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot-dialog.component.html',
  styleUrls: ['./forgot-dialog.component.css']
})
export class ForgotDialogComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ForgotDialogComponent>,
    private firebaseAuthService: FirebaseAuthService,
    @Inject(MAT_DIALOG_DATA) data,
    public snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  public getError(controlName: string): string {
    return UtilsService.getError(this.formGroup, controlName);
  }

  save() {
    this.firebaseAuthService.resetPasswordEmail(this.formGroup.value.email)
      .then(() => {
        this.snackBar.open('Correo enviado', 'ok', {duration: 2000});
      })
      .catch(() => {
        this.snackBar.open('Error enviando correo', 'ok', {duration: 2000});
      });
  }

  close() {
    this.dialogRef.close();
  }

}
