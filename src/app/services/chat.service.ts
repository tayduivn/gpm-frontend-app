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
        // Return object id, with properties data chat object
        switchMap((c: any) => {
          // Unique User IDs
          chat = c;
          const uids = Array.from(new Set(c.messages.map(v => v.uid)));

          // Firestore User Doc Reads
          const userDocs = uids.map(u =>
            this.afs.doc(`user/${u}`).valueChanges()
          );

          // Return array user information
          return userDocs.length ? combineLatest(userDocs) : of([]);
        }),
        map(arr => {
          // Set array id users
          arr.forEach(v => (joinKeys[(<any>v).uid] = v));

          // Add user to each message
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

    const messages = firestore.FieldValue.arrayUnion(data);
    return this.afs.collection('chats').doc(chatId).update({
      messages: messages
    });
  }
}
