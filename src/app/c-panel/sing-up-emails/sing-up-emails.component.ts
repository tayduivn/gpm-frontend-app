import {Component, OnInit} from '@angular/core';
import {ModelSingUpEmail} from '../../models/model-sing-up-email';
import {SingUpEmailApiService} from '../../services/api/sing-up-email-api.service';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-sing-up-emails',
  templateUrl: './sing-up-emails.component.html',
  styleUrls: ['./sing-up-emails.component.css']
})
export class SingUpEmailsComponent implements OnInit {
  emails: ModelSingUpEmail;
  message = 'Loading...';

  constructor(
    private emailApiService: SingUpEmailApiService,
  ) {
  }

  ngOnInit() {
    this.emailApiService.getEmails().subscribe((res: any) => this.emails = res.data);
  }

  formDate(date: any) {
    return UtilsService.formDate(date);
  }
}
