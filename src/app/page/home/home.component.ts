import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as AOS from '../../../assets/js/aos.js';
import {InfoPageApiService} from '../../services/api/info-page-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../assets/js/aos.css', './home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public infoPages: any;
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
  backgroundImage: string;

  constructor(
    private infoPageApiService: InfoPageApiService
  ) {
  }

  ngOnInit() {
    this.infoPageApiService.getInfoPages('?page=Home').subscribe((res: any) => {
      this.infoPages = res.data;
      AOS.init({
        disable: 'phone',
        once: true
      });
    });
  }

  ngAfterViewInit(): void {
  }

}
