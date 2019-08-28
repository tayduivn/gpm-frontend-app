import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize, map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(
    public db: AngularFirestore,
    private dbStorage: AngularFireStorage,
    public snackBar: MatSnackBar
  ) {
  }

  static getDataPayload(payload: any) {
    let data: any;
    if (Object.entries(payload).length === 0 && payload.constructor === Object) {
      data = payload;
    } else {
      data = payload.data();
      data.id = payload.id;
    }
    return data;
  }

  /* User */
  getUser(userKey) {
    return this.db.collection('user').doc(userKey).valueChanges();
  }

  getUsers() {
    return this.db.collection('user').snapshotChanges();
  }

  getUserType(value = 'student') {
    return this.db.collection('user', ref => {
      return ref.where('type', '==', value);
    })
      .snapshotChanges();
  }

  getUserToken(userId, token) {
    return this.db.collection('user', ref => {
      return ref.where('id', '==', userId).where('token', '==', token);
    })
      .snapshotChanges();
  }

  validateUserEmail(email) {
    return this.db.collection('user').ref.where('email', '==', email).get();
  }

  createUser(value) {
    return new Promise(((resolve) => {
      this.db.collection('user').add({
        email: value.email,
        role_id: value.role_id,
        status: 'waiting',
        token: 'yesToken',
        date: new Date().toISOString().substring(0, 10)
      })
        .then(ref => {
          ref.set({user_id: ref.id}, {merge: true});
          resolve(ref.id);
        });
    }));
  }

  updateUser(userKey, value) {
    console.log(value);
    return this.db.collection('user').doc(userKey).update(value);
  }

  deleteUser(userKey) {
    return this.db.collection('user').doc(userKey).delete();
  }

  searchUsers(searchValue) {
    return this.db.collection('user', ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges();
  }

  searchUsersByAge(value) {
    return this.db.collection('user', ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }

  /* Document */
  getDocument(documentKey) {
    return this.db.collection('document').doc(documentKey).snapshotChanges();
  }

  getDocuments() {
    return this.db.collection('document').snapshotChanges();
  }

  getMyDocuments(idUser: string) {
    return this.db.collection('document', ref => {
      return ref.where('id_user', '==', idUser);
    }).snapshotChanges();
  }

  getDocumentStudent(items: string) {
    return this.db.collection('document', ref => {
      return ref.where('id_student', 'array-contains', items);
    }).snapshotChanges();
  }

  uploadDocuments(value: any, uploadProgress) {
    return new Promise((resolve, reject) => {
      let count = 0;
      const uploadURL: any = [];
      const index = 0;
      for (const file of value.files) {
        const filepath = `images/${file.name}`;
        const fileRef = this.dbStorage.ref(filepath);
        // Upload image
        const task = this.dbStorage.upload(filepath, file);
        // Observe percentage changes
        uploadProgress = task.snapshotChanges()
          .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
        /*percentageChanges.subscribe(percentage => {
          percentageArray[index] = percentage; // <--- just put new percentage to needed index
          index++;
          console.log(percentageArray);
        });*/
        // Get notified when the download URL is available
        task.snapshotChanges()
          .pipe(finalize(() => {
            fileRef.getDownloadURL().subscribe((res) => {
              uploadURL[count] = res;
              ++count;
              if (count === value.files.length) {
                resolve(uploadURL);
              }
            });
          }))
          .subscribe();
      }
    });
  }

  createDocument(value) {
    return this.db.collection('document').add({
      title: value.title,
      files: value.files,
      id_user: JSON.parse(localStorage.getItem('user')).id,
      date: new Date().toISOString().substring(0, 10)
    })
      .then(ref => {
        ref.set({document_id: ref.id}, {merge: true});
      });
  }

  updateDocument(documentKey, value) {
    return this.db.collection('document').doc(documentKey).update(value);
  }

  deleteDocument(documentKey) {
    return this.db.collection('document').doc(documentKey).delete();
  }

  /* DataForm */
  getDataForm(dataFormKey) {
    return this.db.collection('dataForm').doc(dataFormKey).snapshotChanges();
  }

  getDataForms() {
    return this.db.collection('dataForm').snapshotChanges();
  }

  getDataFormUser(idUser) {
    return this.db.collection('dataForm', ref => {
      return ref.where('id_user', '==', idUser);
    }).snapshotChanges();
  }

  getDataFormStudent(idStudent) {
    return this.db.collection('dataForm', ref => {
      return ref.where('id_student', '==', idStudent);
    }).snapshotChanges();
  }

  createDataForm(value) {
    return this.db.collection('dataForm').add({
      title: value.title,
      values: value.values,
      id_student: '',
      id_user: JSON.parse(localStorage.getItem('user')).id,
      date: new Date().toISOString().substring(0, 10)
    })
      .then(ref => {
        ref.set({data_form_id: ref.id}, {merge: true});
      });
  }

  updateDataForm(dataFormKey, value) {
    return this.db.collection('dataForm').doc(dataFormKey).update(value);
  }

  deleteDataForm(dataFormKey) {
    return this.db.collection('dataForm').doc(dataFormKey).delete();
  }

  login(email) {
    return this.db.collection('user', ref => {
      return ref
        .where('email', '==', email)
        .where('token', '==', 'yesToken');
    })
      .snapshotChanges();
  }
}
