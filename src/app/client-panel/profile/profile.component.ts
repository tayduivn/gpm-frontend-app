import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserApiService} from '../../services/api/user-api.service';
import {UtilsService} from '../../services/utils.service';
import {ModelUser} from '../../models/model-user';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {Router} from '@angular/router';
import {FirebaseAuthService} from '../../services/firebase/firebase-auth.service';
import {FirebaseService} from '../../services/firebase/firebase.service';
import {MapService} from '../../services/map.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public form: FormGroup;
  public formPass: FormGroup;
  public formBank: FormGroup;
  public hidePass = true;
  public hidePassNew = true;
  public user: ModelUser;
  public message = 'Loading...';
  public location: any = {address: ''};
  private formData = new FormData();
  private fileToUpload: any;

  constructor(
    private fb: FormBuilder,
    private firebaseAuthService: FirebaseAuthService,
    private firebaseService: FirebaseService,
    private userApiService: UserApiService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private mapService: MapService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.getUsers();

    this.formPass = this.fb.group({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  private getUsers() {
    const query = `?id=${JSON.parse(localStorage.getItem('user')).id}`;
    this.userApiService.getUsers(query).subscribe((res: any) => {
      this.user = res.data[0];
      this.setForm();
      setTimeout(() => this.setMap(), 1);
    });
  }

  private setMap() {
    this.mapService.setMap(undefined, undefined, true);
    this.mapService.geocoder.on('result', ev => {
      this.location.address = 'Loading...';
      const lng = ev.result.geometry.coordinates[0];
      const lat = ev.result.geometry.coordinates[1];
      this.mapService.getLocationName(lng, lat).subscribe((res: any) => {
        this.location.map_lng = lng;
        this.location.map_lat = lat;
        console.log(lng);
        console.log(lat);
        this.setFormValuesLocation(res);
        this.location.address = res.features[2].place_name;
      }, () => {
        alert('Error cargando datos');
      });
    });

    this.mapService.map.on('click', ev => {
      this.location.address = 'Loading...';
      const lng = ev.lngLat.lng;
      const lat = ev.lngLat.lat;
      this.mapService.getLocationName(lng, lat).subscribe((res: any) => {
        this.location.map_lng = lng;
        this.location.map_lat = lat;
        this.setFormValuesLocation(res);
      }, () => {
        alert('Error cargando datos');
      });
    });
  }

  private setFormValuesLocation(res: any) {
    console.log(res);
    res.features.forEach((item) => {
      if (item.place_type[0] === 'poi' || item.place_type[0] === 'address') {
        this.form.get('address').patchValue(item.place_name);
        this.location.address = item.place_name;
      }
      if (item.place_type[0] === 'postcode') {
        this.form.get('postal_code').patchValue(item.text);
      }
      if (item.place_type[0] === 'place') {
        this.form.get('city').patchValue(item.text);
      }
      if (item.place_type[0] === 'region') {
        this.form.get('state').patchValue(item.text);
      }
      if (item.place_type[0] === 'country') {
        this.form.get('country').patchValue(item.text);
      }
    });
  }

  private setForm() {
    this.form = this.fb.group({
      email: new FormControl({value: this.user.email, disabled: true}, [Validators.required, Validators.email]),
      phone: new FormControl(this.user.phone, [Validators.required]),
      first_name: new FormControl(this.user.first_name, [Validators.required]),
      last_name: new FormControl(this.user.last_name, [Validators.required]),
      address: new FormControl(this.user.address, [Validators.required]),
      city: new FormControl(this.user.city, [Validators.required]),
      state: new FormControl(this.user.state, [Validators.required]),
      country: new FormControl(this.user.country, [Validators.required]),
      postal_code: new FormControl(this.user.postal_code, [Validators.required]),
    });

    this.formBank = this.fb.group({
      email_paypal: new FormControl(this.user.email_paypal, [Validators.required]),
    });
  }

  send() {
    const user = this.form.value;
    user.id = this.user.id;
    user.status = this.user.status;
    user.role_id = this.user.role_id;
    this.userApiService.updateUser(user).subscribe(() => {
      this.snackBar.open('success', 'ok', {duration: 2000});
      const userProfile = JSON.parse(localStorage.getItem('user'));
      userProfile.email = this.form.value.email;
      userProfile.phone = this.form.value.phone;
      userProfile.first_name = this.form.value.first_name;
      userProfile.last_name = this.form.value.last_name;
      userProfile.address = this.form.value.address;
      userProfile.city = this.form.value.city;
      userProfile.state = this.form.value.state;
      userProfile.country = this.form.value.country;
      userProfile.postal_code = this.form.value.postal_code;
      localStorage.setItem('user', JSON.stringify(userProfile));
      this.getUsers();
    });
  }

  sendBank() {
    this.formBank.value.id = this.user.id;
    this.formBank.value.status = 'complete';
    this.userApiService.bankUser(this.formBank.value).subscribe(() => {
      this.firebaseService.updateUser(this.user.firebase_id, {status: 'complete'})
        .then(() => {
          this.snackBar.open('success', 'ok', {duration: 2000});
          this.getUsers();
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  sendPass() {
    this.formPass.value.id = this.user.id;
    this.userApiService.passwordUser(this.formPass.value).subscribe(() => {
      this.firebaseAuthService.resetPasswordEmail(this.user.email)
        .then(() => {
          this.snackBar.open('Por favor, revisa tu correo', 'ok', {duration: 2000});
        })
        .catch((err) => {
          this.snackBar.open('Error enviando correo', 'ok', {duration: 2000});
          console.log(err);
        });
    });
  }

  deleteData() {
    this.dialog.open(ConfirmDialogComponent, {disableClose: false}).afterClosed().subscribe(result => {
      if (result) {
        const id = JSON.parse(localStorage.getItem('user')).id;
        this.userApiService.deleteUser(id).subscribe(() => {
          this.snackBar.open('Deleted', 'ok', {duration: 2000});
          this.router.navigate(['index/home']);
        });
      }
    });
  }

  /* Image */
  public uploadImage(event) {
    this.fileToUpload = event.target.files;
    this.formData.delete('image');
    if (this.fileToUpload.length) {
      for (const image of this.fileToUpload) {
        this.formData.append('image', image, image.name);
      }
    }
  }

  upload() {
    this.formDataSend();
    this.userApiService.updateUserPhoto(this.formData)
      .subscribe(() => {
        this.snackBar.open('success', 'ok', {duration: 2000});
        this.getUsers();
      });
  }

  private formDataSend() {
    if (this.fileToUpload.length === 0) {
      this.snackBar.open('Upload a image', 'ok', {duration: 2000});
      return;
    }
    this.formData.delete('id');
    this.formData.append('id', JSON.parse(localStorage.getItem('user')).id);
  }

  getPhotoProfile() {
    return this.user.photo ? this.user.photo : '../../../assets/login-user-icon.png';
  }

  getError(controlName: string) {
    return UtilsService.getError(this.form, controlName);
  }

  getErrorPass(controlName: string) {
    return UtilsService.getError(this.formPass, controlName);
  }

  getErrorBank(controlName: string) {
    return UtilsService.getError(this.formBank, controlName);
  }
}
