import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingUpEmailsComponent } from './sing-up-emails.component';

describe('SingUpEmailsComponent', () => {
  let component: SingUpEmailsComponent;
  let fixture: ComponentFixture<SingUpEmailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingUpEmailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingUpEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
