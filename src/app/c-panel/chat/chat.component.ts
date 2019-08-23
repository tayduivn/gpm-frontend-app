import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {ActivatedRoute} from '@angular/router';
import {ChatAuthService} from '../../services/chat-auth.service';
import {UtilsService} from '../../services/utils.service';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatComponent implements OnInit {
  chat: any;
  newMsg: string;
  user = JSON.parse(localStorage.getItem('user'));
  private fileToUpload: any;

  constructor(
    public cs: ChatService,
    public auth: ChatAuthService,
    private route: ActivatedRoute,
    private dbStorage: AngularFireStorage,
  ) {
  }

  ngOnInit() {
    const chatId = this.route.snapshot.paramMap.get('chatId');
    this.cs.getChat(chatId).subscribe((res) => {
      this.chat = res;
    });
  }

  submitMessage() {
    this.cs.sendMessage(this.chat.id, this.newMsg);
    this.newMsg = '';
  }

  handleFileInput(target: any) {
    this.fileToUpload = target.files[0];
    const name = `${Date.now()}-${this.fileToUpload.name}`;
    const fileRef = this.dbStorage.ref(`files/${name}`);
    const task = this.dbStorage.upload(`files/${name}`, this.fileToUpload);
    task.snapshotChanges().pipe(finalize(() => fileRef.getDownloadURL().subscribe((res) => {
      res = `<a href="${res}" target="_blank">Ver Archivo</a>`;
      this.cs.sendMessage(this.chat.id, res);
    }))).subscribe();
  }

  getDate(createdAt: any) {
    return UtilsService.formDate(createdAt);
  }
}
