import {Component, OnInit} from '@angular/core';
import {GlobalConfigApiService} from '../../services/api/global-config-api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilsService} from '../../services/utils.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-global-config',
  templateUrl: './global-config.component.html',
  styleUrls: ['./global-config.component.css']
})
export class GlobalConfigComponent implements OnInit {
  public globalConfig: any;
  public message = 'Loading';
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private globalConfigApiService: GlobalConfigApiService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.globalConfigApiService.getGlobalConfigs().subscribe((res: any) => {
      this.globalConfig = res.data;
      this.form = this.fb.group({
        membership: [res.data[0].membership, [Validators.required]],
        percentage: [res.data[0].percentage, [Validators.required]],
      });
    }, () => {
      this.message = 'Error loading data';
    });
  }

  public getError(controlName: string): string {
    return UtilsService.getError(this.form, controlName);
  }

  save() {
    this.form.value.id = this.globalConfig[0].id;
    this.globalConfigApiService.updateGlobalConfig(this.form.value).subscribe(() => {
      this.snackBar.open('success', 'ok', {duration: 2000});
    });
  }
}
