import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as AOS from 'aos';
import {GlobalConfigApiService} from '../../services/api/global-config-api.service';
import {InfoPageApiService} from '../../services/api/info-page-api.service';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['../../../assets/js/aos.css', './membership.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MembershipComponent implements OnInit {
  public infoPages: any;
  public amount: any;

  constructor(
    private globalConfigApiService: GlobalConfigApiService,
    private infoPageApiService: InfoPageApiService
  ) {
  }

  ngOnInit() {
    this.globalConfigApiService.getGlobalConfigs().subscribe((res: any) => {
      this.amount = res.data[0].membership;
    });
    this.infoPageApiService.getInfoPages('?page=Membership').subscribe((res: any) => {
      this.infoPages = res.data;
      AOS.init({
        once: true
      });
    });
  }

}
