import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import {FirebaseAuthService} from '../../services/firebase/firebase-auth.service';
import {UserApiService} from '../../services/api/user-api.service';
import {Router} from '@angular/router';
import {FirebaseService} from '../../services/firebase/firebase.service';
import {RoleApiService} from '../../services/api/role-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;
  public isLoad = false;
  public roles: any;
  public hide = false;
  private _duration = 10000;

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private firebaseAuthService: FirebaseAuthService,
    private firebaseService: FirebaseService,
    private userApiService: UserApiService,
    private roleApiService: RoleApiService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.roleApiService.getRoles().subscribe((res: any) => this.roles = res.data);
    this.setForm();
  }

  private setForm() {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
      role: new FormControl('', [Validators.required]),
    });
  }

  doFacebook() {
    this.firebaseAuthService.doFacebookLogin()
      .then((res) => {
        this.isLoad = true;
        this.setUser(res);
      })
      .catch(() => {
        this.isLoad = false;
        this.snackBar.open('Error', 'ok', {duration: this._duration});
      });
  }

  doGoogle() {
    this.firebaseAuthService.doGoogleLogin()
      .then((res) => {
        this.isLoad = true;
        this.setUser(res);
      })
      .catch(() => {
        this.isLoad = false;
        this.snackBar.open('Error', 'ok', {duration: this._duration});
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
        this.isLoad = false;
        this.snackBar.open('Usuario ya existente, por favor haz login', 'ok', {duration: this._duration});
        this.firebaseAuthService.logout().then(() => console.log('logout'));
      } else {
        this.createUser(user);
      }
    });
  }

  doRegister() {
    this.isLoad = true;
    const user = {
      email: this.form.value.email,
      password: this.form.value.pass,
      role_id: this.form.value.role
    };
    this.firebaseAuthService.doRegister(user.email, user.password)
      .then(() => {
        this.createUser(user);
      })
      .catch((err) => {
        console.log(err);
        this.isLoad = false;
        if (err.message === 'The email address is already in use by another account.') {
          this.snackBar.open('The email address is already in use by another account.', 'ok', {duration: this._duration});
        } else {
          this.snackBar.open('Error creando usuario', 'ok', {duration: this._duration});
        }
      });
  }

  private createUser(user) {
    console.log(user);
    this.firebaseService.createUser(user)
      .then((resID) => {
        user.firebase_id = resID;
        this.userApiService.createUser(user).subscribe(() => {
          this.snackBar.open('Usuario creado con éxito', 'ok', {duration: this._duration});
          this.router.navigate(['/index/login']);
        }, (err) => {
          this.isLoad = false;
          console.log(err);
          this.isLoad = false;
          this.snackBar.open('Error creando usuario', 'ok', {duration: this._duration});
        });
      })
      .catch((err) => {
        this.isLoad = false;
        console.log(err);
        this.isLoad = false;
        this.snackBar.open('Error creando usuario', 'ok', {duration: this._duration});
      });
  }

  /* Get Errors */
  get email() {
    return this.form.get('email');
  }

  get pass() {
    return this.form.get('pass');
  }

  get role() {
    return this.form.get('role');
  }
}
