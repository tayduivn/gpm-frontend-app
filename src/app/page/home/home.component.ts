import {Component, OnInit} from '@angular/core';
import * as AOS from 'aos';
import 'aos/dist/aos.css';

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
  slideConfigTestimony = {
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    infinite: true,
    slidesToScroll: 1,
  };
  comments = [
    {name: 'Juan Torrealba', comment: 'Excelente plataforma para vender mis productos', img: '../../../assets/logo.png'},
    {name: 'Jesús Pacheco', comment: 'He conseguido lo que necesitaba', img: '../../../assets/logo.png'},
    {name: 'María Gonzalez', comment: 'He realizado mis pagos seguro', img: '../../../assets/logo.png'}
  ];

  constructor() {
  }

  ngOnInit() {
    AOS.init();
  }

}
