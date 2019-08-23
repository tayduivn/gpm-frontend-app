import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ModelRoles} from '../../models/model-roles';

@Component({
  selector: 'app-form-categories',
  templateUrl: './roles-dialog.component.html',
  styleUrls: ['./roles-dialog.component.css']
})
export class RolesDialogComponent implements OnInit {
  public form: FormGroup;
  public role: ModelRoles;

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<RolesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.startDialog(data);
  }

  private startDialog(data) {
    if (Object.entries(data).length === 0 && data.constructor === Object) {
      this.role = null;
      this.form = this.fb.group({
        name: [''],
        email: ['', [Validators.required, Validators.email]],
        type: ['', [Validators.required]],
      });
    } else {
      this.role = data;
      this.form = this.fb.group({
        name: [this.role.name],
      });
    }
  }

  ngOnInit(): void {
  }

  public getError(controlName: string): string {
    let error = '';
    const control = this.form.get(controlName);
    if (control.errors !== null) {
      if (control.errors.required === true) {
        error = 'Campo requerido';
      } else if (control.errors.email) {
        error = 'Correo invalido';
      }
    }
    return error;
  }

  public save() {
    /* Is edit */
    if (this.role !== null) {
      this.form.value.id = this.role.id;
    }
    /* Make request */
    this.dialogRef.close();
  }

  public close() {
    this.dialogRef.close();
  }
}
