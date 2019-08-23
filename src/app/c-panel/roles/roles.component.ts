import {Component, OnInit} from '@angular/core';
import {ModelRoles} from '../../models/model-roles';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles: ModelRoles;
  message = 'Loading...';

  constructor() {
  }

  ngOnInit() {
  }

  openDialog(model: ModelRoles = null) {

  }

  confirmDialog(id: string) {

  }

  formDate(date: any) {
    return UtilsService.formDate(date);
  }
}
