import {Component, OnInit} from '@angular/core';
import * as AOS from 'aos';
import {InfoPageApiService} from '../../services/api/info-page-api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['../../../assets/js/aos.css', './about.component.css']
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
      AOS.init();
    });
  }

}
