import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../services/firebase/firebase.service';
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
    private chatService: ChatService,
  ) {
  }

  ngOnInit() {
    this.chatService.getChatMessages()
      .subscribe((res: any) => {
        return this.chats = res;
      });
  }
}
