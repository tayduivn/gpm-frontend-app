import {Component, OnInit} from '@angular/core';
import * as AOS from 'aos';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['../../../assets/js/aos.css', './contact.component.css']
})
export class ContactComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    AOS.init({
      once: true
    });
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  /* Get Errors */
  get email() {
    return this.form.get('email');
  }

  get name() {
    return this.form.get('name');
  }

  get message() {
    return this.form.get('message');
  }

  public sendEmail() {

  }
}
