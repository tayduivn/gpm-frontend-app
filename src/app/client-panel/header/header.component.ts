import {Component, OnInit} from '@angular/core';
import {FirebaseAuthService} from '../../services/firebase/firebase-auth.service';
import {FirebaseService} from '../../services/firebase/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', './side-nav.component.css']
})
export class HeaderComponent implements OnInit {
  public user = JSON.parse(localStorage.getItem('user'));
  public status = 'waiting';
  private openMenu = 0;

  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private firebaseService: FirebaseService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.firebaseRequest();
    this.scroll();
    this.closeDropDown();
  }

  private firebaseRequest() {
    this.firebaseService.getUser(this.user.firebase_id).subscribe((res: any) => {
      console.log(res);
      if (res && res.status !== undefined) {
        this.status = res.status;
        if (this.status === 'waiting') {
          this.router.navigate(['/client/profile']);
        }
      }
    });
  }

  private scroll() {
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

  private closeDropDown() {
    // Close the dropdown if the user clicks outside of it
    window.onclick = function (event: any) {
      if (!event.target.matches('.dropbtn')) {
        const dropDowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropDowns.length; i++) {
          const openDropdown = dropDowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    };
  }

  dropdownShow(index) {
    const dropDowns = document.getElementsByClassName('dropdown-content');
    for (let i = 0; i < dropDowns.length; i++) {
      if (dropDowns[i].classList.contains('show')) {
        dropDowns[i].classList.remove('show');
      }
    }
    dropDowns[index].classList.toggle('show');
  }

  logout() {
    this.firebaseAuthService.logout().then(() => {
      localStorage.setItem('user', '');
      this.router.navigate(['/index/login']);
    });
  }

  openNav() {
    document.getElementById('mySidenav').style.left = '0px';
    this.openMenu++;
  }

  closeNav() {
    this.openMenu = 0;
    document.getElementById('mySidenav').style.left = '-300px';
  }
}
