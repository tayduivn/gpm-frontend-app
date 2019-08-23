import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slideConfig = {
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    infinite: true,
    slidesToScroll: 1,
  };
  images = [
    {path: '../../../assets/client/home-one.jpg'},
    {path: '../../../assets/client/home-two.jpg'},
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
