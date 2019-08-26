import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../services/firebase/firebase.service';
import {FirebaseAuthService} from '../../services/firebase/firebase-auth.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {UtilsService} from '../../services/utils.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ForgotDialogComponent} from '../../dialog/forgot-dialog/forgot-dialog.component';
import {UserApiService} from '../../services/api/user-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public hide = true;
  public isLoad = false;
  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(
    private firebaseDB: FirebaseService,
    private authService: FirebaseAuthService,
    private fb: FormBuilder,
    private router: Router,
    private userApiService: UserApiService,
    private firebaseAuthService: FirebaseAuthService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl(localStorage.getItem('email-login'), [Validators.required, Validators.email]),
      pass: new FormControl(localStorage.getItem('pass-login'), [Validators.required, Validators.minLength(6)]),
      remember: new FormControl(true)
    });
  }

  public getError(controlName: string): string {
    return UtilsService.getError(this.form, controlName);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  login() {
    this.isLoad = true;
    if (this.form.value.remember) {
      localStorage.setItem('email-login', this.form.value.email);
      localStorage.setItem('pass-login', this.form.value.pass);
    }
    const user = {
      email: this.form.value.email,
      password: this.form.value.pass,
    };
    this.userApiService.loginUser(user).subscribe((res: any) => {
      this.firebaseAuthService.authLogIn(user.email, user.password)
        .then(() => {
          localStorage.setItem('user', JSON.stringify(res.data.user));
          localStorage.setItem('token', res.data.token);
          this.router.navigate(['/cPanel/home']);
        })
        .catch((err) => {
          console.log(err);
          this.isLoad = false;
          this.snackBar.open('Ocurrió error', 'ok', {duration: 2000});
        });
    }, (err) => {
      console.log(err);
      this.isLoad = false;
      this.snackBar.open('Ocurrió error', 'ok', {duration: 2000});
    });
  }

  openForgot() {
    this.dialog.open(ForgotDialogComponent, {width: '500px'}).afterClosed()
      .subscribe(() => {
        console.log('close form');
      });
  }

}
