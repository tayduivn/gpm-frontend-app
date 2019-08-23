import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {UtilsService} from '../../services/utils.service';
import {UserApiService} from '../../services/api/user-api.service';
import {ModelUser} from '../../models/model-user';
import {FirebaseService} from '../../services/firebase/firebase.service';
import {FirebaseAuthService} from '../../services/firebase/firebase-auth.service';

@Component({
  selector: 'app-form-categories',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.css']
})
export class UsersDialogComponent implements OnInit {
  public form: FormGroup;
  public hide = true;
  public hidePass = true;
  public user: ModelUser;
  private isLoad = false;

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<UsersDialogComponent>,
    private userApiService: UserApiService,
    private firebaseService: FirebaseService,
    private firebaseAuthService: FirebaseAuthService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.startDialog(data);
  }

  private startDialog(data) {
    if (Object.entries(data).length === 0 && data.constructor === Object) {
      this.user = null;
      this.form = this.fb.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        pass_repeat: new FormControl('', [Validators.required]),
      }, {validator: this.passwordConfirming});
    } else {
      this.user = data;
      this.form = this.fb.group({
        email: new FormControl(this.user.email, [Validators.required, Validators.email]),
        password: new FormControl(this.user.password, [Validators.required, Validators.minLength(6)]),
        pass_repeat: new FormControl('', [Validators.required]),
      }, {validator: this.passwordConfirming});
    }
  }

  private passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('pass_repeat').value) {
      return {invalid: true};
    }
  }

  ngOnInit(): void {
  }

  public getError(controlName: string): string {
    return UtilsService.getError(this.form, controlName);
  }

  save() {
    const user = {
      email: this.form.value.email,
      password: this.form.value.password,
      role_id: 1
    };
    this.firebaseAuthService.doRegister(user.email, user.password)
      .then(() => {
        this.createUser(user);
      })
      .catch((err) => {
        console.log(err);
        this.isLoad = false;
        this.snackBar.open('Error creando usuario', 'ok', {duration: 2000});
      });
  }

  private createUser(user) {
    this.firebaseService.createUser(user)
      .then((resID) => {
        user.firebase_id = resID;
        this.userApiService.createUser(user).subscribe(() => {
          this.snackBar.open('Success', 'ok', {duration: 2000});
          this.dialogRef.close();
        }, (err) => {
          console.log(err);
          this.isLoad = false;
          this.snackBar.open('Error creando usuario', 'ok', {duration: 2000});
        });
      })
      .catch((err) => {
        console.log(err);
        this.isLoad = false;
        this.snackBar.open('Error creando usuario', 'ok', {duration: 2000});
      });
  }

  public close() {
    this.dialogRef.close();
  }
}
