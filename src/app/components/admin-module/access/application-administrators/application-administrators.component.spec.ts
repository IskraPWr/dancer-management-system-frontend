import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationAdministratorsComponent } from './application-administrators.component';

describe('ApplicationAdministratorsComponent', () => {
  let component: ApplicationAdministratorsComponent;
  let fixture: ComponentFixture<ApplicationAdministratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationAdministratorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationAdministratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
