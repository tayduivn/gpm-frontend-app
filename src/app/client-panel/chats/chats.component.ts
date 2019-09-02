import {Component, OnInit} from '@angular/core';
import {FirebaseAuthService} from '../../services/firebase/firebase-auth.service';
import {ChatService} from '../../services/chat.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  message = 'Loading...';
  chats: any;
  public user = JSON.parse(localStorage.getItem('user'));

  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private chatService: ChatService,
  ) {
  }

  ngOnInit() {
    this.chatService.getChatMessages()
      .pipe(map((value: any) => {
        return value.filter((item: any) => {
          const data = item.payload.doc.data();
          return data.first_uid === this.user.firebase_id || data.second_uid === this.user.firebase_id;
        });
      }))
      .subscribe((res: any) => {
        return this.chats = res;
      });
  }

  createChat() {
    const user_two = this.user.firebase_id;
    const user_one = 'ykxmQCzDJk2GMEJTjCph';

    const data = {
      first_uid: user_one,
      second_uid: user_two,
      second: {
        displayName: this.user.first_name,
        photo: this.user.photo,
        email: this.user.email
      },
      first: {
        displayName: 'juan',
        photo: 'https://i.dailymail.co.uk/i/pix/2017/04/20/13/3F6B966D00000578-4428630-image-m-80_1492690622006.jpg',
        email: 'pedro@gmail.com'
      },
      createdAt: Date.now(),
      messages: []
    };

    this.chatService.createChat(data)
      .then((res) => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
