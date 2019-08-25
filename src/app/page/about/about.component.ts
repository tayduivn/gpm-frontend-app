import {Component, OnInit} from '@angular/core';
import * as AOS from '../../../assets/js/aos';
import {InfoPageApiService} from '../../services/api/info-page-api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  infoPages: any;

  constructor(
    private infoPageApiService: InfoPageApiService
  ) {
  }

  ngOnInit() {
    this.infoPageApiService.getInfoPages('?page=About').subscribe((res: any) => {
      this.infoPages = res.data;
      console.log(this.infoPages);
      AOS.init({
        disable: 'phone',
        once: true
      });
    });
  }

}
