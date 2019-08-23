import {Injectable} from '@angular/core';
import {map, switchMap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {combineLatest, of} from 'rxjs';
import {firestore} from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public db: AngularFirestore,
    private afs: AngularFirestore,
  ) {
  }

  getChatMessages() {
    return this.db.collection('chats').snapshotChanges();
  }

  getChat(chatId) {
    let chat;
    const joinKeys = {};

    return this.afs
      .collection<any>('chats')
      .doc(chatId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return {id: doc.payload.id, ...doc.payload.data()};
        }),
        switchMap((c: any) => {
          // Unique User IDs
          chat = c;
          const uids = Array.from(new Set(c.messages.map(v => v.uid)));

          // Firestore User Doc Reads
          const userDocs = uids.map(u =>
            this.afs.doc(`user/${u}`).valueChanges()
          );

          return userDocs.length ? combineLatest(userDocs) : of([]);
        }),
        map(arr => {
          arr.forEach(v => (joinKeys[(<any>v).uid] = v));
          chat.messages = chat.messages.map(v => {
            return {...v, user: joinKeys[v.uid]};
          });

          return chat;
        })
      );
  }

  createChat(data) {
    return this.afs.collection('chats').add(data);
  }

  sendMessage(chatId, content) {
    const data = {
      uid: JSON.parse(localStorage.getItem('user')).firebase_id,
      content,
      createdAt: Date.now()
    };

    return this.afs.collection('chats').doc(chatId).update({
      messages: firestore.FieldValue.arrayUnion(data)
    });
  }
}
