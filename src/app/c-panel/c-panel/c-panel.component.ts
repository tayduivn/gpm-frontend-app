import {Component, OnInit} from '@angular/core';
import {FirebaseAuthService} from '../../services/firebase/firebase-auth.service';
import {Router} from '@angular/router';
import jQuery from 'jquery';

@Component({
  selector: 'app-c-panel',
  templateUrl: './c-panel.component.html',
  styleUrls: ['./c-panel.component.css']
})
export class CPanelComponent implements OnInit {

  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    jQuery('.sub-menu ul').hide();
    jQuery('.sub-menu a').click(function () {
      jQuery(this).parent('.sub-menu').children('ul').slideToggle('100');
      jQuery(this).find('.right').toggleClass('fa-caret-up fa-caret-down');
    });
    const menuIconEl = jQuery('.menu-icon');
    const sidenavEl = jQuery('.sidenav');
    const sidenavCloseEl = jQuery('.sidenav__close-icon');

    // Add and remove provided class names
    function toggleClassName(el, className) {
      if (el.hasClass(className)) {
        el.removeClass(className);
      } else {
        el.addClass(className);
      }
    }

    // Open the side nav on click
    menuIconEl.on('click', function () {
      toggleClassName(sidenavEl, 'active');
    });

    // Close the side nav on click
    sidenavCloseEl.on('click', function () {
      toggleClassName(sidenavEl, 'active');
    });
    // Close the dropdown if the user clicks outside of it
    window.onclick = function (event: any) {
      if (!event.target.matches('.dropbtn')) {
        const dropDowns = document.getElementsByClassName('dropdown-content');
        let i;
        for (i = 0; i < dropDowns.length; i++) {
          const openDropdown = dropDowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    };
  }

  dropdownShow() {
    document.getElementById('myDropdown').classList.toggle('show');
  }

  logout() {
    this.firebaseAuthService.logout().then(() => {
      localStorage.setItem('user', '');
      this.router.navigate(['/cPanel/login']);
    });
  }

}
