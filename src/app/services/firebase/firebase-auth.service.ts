import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(
    private afAuth: AngularFireAuth,
  ) {
    this.user = afAuth.authState;
    this.user.subscribe(user => {
        if (user) {
          this.userDetails = user;
          /*console.log(this.userDetails);*/
        } else {
          /*snackBar.open('Error en inicio de sesión', 'ok', {duration: 2000,});*/
          console.log('not login');
          this.userDetails = null;
        }
      }
    );
  }

  authLogIn(email, password) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  doRegister(email, password) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }

  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        });
    });
  }

  resetPasswordEmail(email: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.sendPasswordResetEmail(email)
        .then((res: any) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  authUpdatePass(password) {
    return this.afAuth.auth.currentUser.updatePassword(password);
  }

  authState() {
    return new Promise<any>((resolve) => {
      this.afAuth.auth.onAuthStateChanged(user => {
        if (user) {
          resolve(user);
        } else {
          resolve('error');
        }
      });
    });
  }

  isLoggedIn() {
    return this.userDetails != null;
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}
