import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import {FirebaseAuthService} from '../../services/firebase/firebase-auth.service';
import {UserApiService} from '../../services/api/user-api.service';
import {Router} from '@angular/router';
import {FirebaseService} from '../../services/firebase/firebase.service';
import {RoleApiService} from '../../services/api/role-api.service';
import {UtilsService} from '../../services/utils.service';

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
    const email = localStorage.getItem('email-client-login') ? localStorage.getItem('email-client-login') : '';
    const login = localStorage.getItem('pass-client-login') ? localStorage.getItem('pass-client-login') : '';
    this.form = this.fb.group({
      email: new FormControl(email, [Validators.required, Validators.email]),
      pass: new FormControl(login, [Validators.required, Validators.minLength(6)]),
      role: new FormControl('', [Validators.required]),
      remember: new FormControl(true)
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
        this.snackBar.open('Error', 'ok', {duration: 2000});
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
        this.isLoad = false;
        this.snackBar.open('Usuario ya existente, por favor haz login', 'ok', {duration: 2000});
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
        this.isLoad = false;
        console.log(err);
        this.isLoad = false;
        this.snackBar.open('Error creando usuario', 'ok', {duration: 2000});
      });
  }

  private createUser(user) {
    console.log(user);
    this.firebaseService.createUser(user)
      .then((resID) => {
        user.firebase_id = resID;
        this.userApiService.createUser(user).subscribe(() => {
          this.router.navigate(['/index/login']);
        }, (err) => {
          this.isLoad = false;
          console.log(err);
          this.isLoad = false;
          this.snackBar.open('Error creando usuario', 'ok', {duration: 2000});
        });
      })
      .catch((err) => {
        this.isLoad = false;
        console.log(err);
        this.isLoad = false;
        this.snackBar.open('Error creando usuario', 'ok', {duration: 2000});
      });
  }

  public getError(controlName: string): string {
    return UtilsService.getError(this.form, controlName);
  }
}
