import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', './side-nav.component.css']
})
export class HeaderComponent implements OnInit {

  public color = '';
  private openMenu = 0;

  constructor(
    private router: Router
  ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url === '/index/about') {
        this.color = 'white';
      } else {
        this.color = '';
      }
    });
  }

  ngOnInit() {
    const self = this;
    window.addEventListener('click', function (e: any) {
      if (document.getElementById('mySidenav') !== null) {
        if (!document.getElementById('mySidenav').contains(e.target)) {
          if (self.openMenu > 1) {
            self.closeNav();
          }
          if (self.openMenu > 0) {
            self.openMenu++;
          }
        }
      }
    });

    window.onscroll = function () {
      const header = document.getElementById('header-home');
      if (header !== null && header !== undefined) {
        const sticky = header.offsetTop;
        if (window.pageYOffset > sticky) {
          header.classList.add('sticky');
        } else {
          header.classList.remove('sticky');
        }
      }
    };

  }

  openNav() {
    document.getElementById('mySidenav').style.left = '0px';
    this.openMenu++;
  }

  closeNav(location = '') {
    /*if (location !== '') this.$router.push(location)*/
    this.openMenu = 0;
    document.getElementById('mySidenav').style.left = '-300px';
  }

}
