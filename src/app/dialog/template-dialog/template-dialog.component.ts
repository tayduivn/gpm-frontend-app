import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-c-panel-template',
  templateUrl: './template-dialog.component.html',
  styleUrls: ['./template-dialog.component.css']
})
export class TemplateDialogComponent implements OnInit {
  public form: FormGroup;
  public data: any = {};

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<TemplateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.startDialog(data);
  }

  private startDialog(data) {
    if (Object.entries(data).length === 0 && data.constructor === Object) {
      this.data = null;
      this.form = this.fb.group({
        name: [''],
        email: ['', [Validators.required, Validators.email]],
        type: ['', [Validators.required]],
      });
    } else {
      this.data = data;
      this.form = this.fb.group({
        name: [this.data.name],
        email: [this.data.email, [Validators.required, Validators.email]],
        type: [this.data.type],
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
    if (this.data !== null) {
      this.form.value.id = this.data.id;
    }
    /* Make request */
    this.dialogRef.close();
  }

  public close() {
    this.dialogRef.close();
  }
}
