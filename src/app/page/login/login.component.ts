import {Component, OnInit} from '@angular/core';
import {FirebaseAuthService} from '../../services/firebase/firebase-auth.service';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserApiService} from '../../services/api/user-api.service';
import {ForgotDialogComponent} from '../../dialog/forgot-dialog/forgot-dialog.component';
import {CartApiService} from '../../services/api/cart-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public isLoad = false;
  public hide = false;

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private firebaseAuthService: FirebaseAuthService,
    private userApiService: UserApiService,
    private cartApiService: CartApiService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    console.log(localStorage.getItem('token'));
    const email = localStorage.getItem('email-client-login') ? localStorage.getItem('email-client-login') : '';
    const login = localStorage.getItem('pass-client-login') ? localStorage.getItem('pass-client-login') : '';
    this.form = this.fb.group({
      email: new FormControl(email, [Validators.required, Validators.email]),
      pass: new FormControl(login, [Validators.required, Validators.minLength(6)]),
      remember: new FormControl(true)
    });
  }

  doFacebook() {
    this.firebaseAuthService.doFacebookLogin()
      .then((res) => {
        this.setUser(res);
      })
      .catch(() => {
        this.snackBar.open('Error', 'ok', {duration: 2000});
      });
  }

  doGoogle() {
    this.firebaseAuthService.doGoogleLogin()
      .then((res) => {
        this.setUser(res);
      })
      .catch(() => {
        this.snackBar.open('Error', 'ok', {duration: 2000});
      });
  }

  private setUser(res) {
    const user = {
      email: res.user.email,
      first_name: res.user.displayName,
      phone: res.user.phoneNumber,
      photo: res.user.photoURL,
      role_id: 1,
    };
    this.userApiService.getUserEmail(user.email).subscribe((resUser: any) => {
      if (resUser.data.user) {
        localStorage.setItem('user', JSON.stringify(resUser.data.user));
        localStorage.setItem('token', resUser.data.token);
        this.router.navigate(['/client/home']);
      } else {
        this.isLoad = false;
        this.firebaseAuthService.logout().then(() => console.log('logout'));
        this.snackBar.open('Usuario no existente, por favor registrarse', 'ok', {duration: 2000});
      }
    });
  }

  doLogin() {
    this.isLoad = true;
    if (this.form.value.remember) {
      localStorage.setItem('email-client-login', this.form.value.email);
      localStorage.setItem('pass-client-login', this.form.value.pass);
    }
    const user = {
      email: this.form.value.email,
      password: this.form.value.pass,
    };
    this.userApiService.loginUser(user).subscribe((res: any) => {
      this.firebaseAuthService.authLogIn(user.email, user.password)
        .then(() => {
          console.log(res);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          console.log(localStorage.getItem('token'));
          this.cartApiService.getCartStatus(res.data.user.id).subscribe((resStatus: any) => {
            console.log(resStatus);
            localStorage.setItem('cartId', resStatus.data[0].cart_id);
            this.router.navigate(['/client/home']);
          });
        })
        .catch(() => {
          this.isLoad = false;
          this.snackBar.open('Ocurrió un error', 'ok', {duration: 2000});
        });
    }, () => {
      this.isLoad = false;
      this.snackBar.open('Ocurrió un error', 'ok', {duration: 2000});
    });
  }

  openForgot() {
    this.dialog.open(ForgotDialogComponent, {width: '500px'}).afterClosed()
      .subscribe(() => {
        console.log('close form');
      });
  }

  /* Get Errors */
  get email() {
    return this.form.get('email');
  }

  get pass() {
    return this.form.get('pass');
  }
}
