import {Component, OnInit} from '@angular/core';
import * as AOS from 'aos';
import 'aos/dist/aos.css';
import {InfoPageApiService} from '../../services/api/info-page-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public infoPages: any;
  public comments = [];
  slideConfig = {
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    infinite: true,
    slidesToScroll: 1,
  };
  slideConfigTestimony = {
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    infinite: true,
    slidesToScroll: 1,
  };

  constructor(
    private infoPageApiService: InfoPageApiService
  ) {
  }

  ngOnInit() {
    this.infoPageApiService.getInfoPages('?reference=Home').subscribe((res: any) => {
      this.infoPages = res.data;
      this.infoPages.forEach((item) => this.comments.push(item));
    });
    AOS.init();
  }

}
