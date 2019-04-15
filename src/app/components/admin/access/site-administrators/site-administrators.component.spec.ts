import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteAdministratorsComponent } from './site-administrators.component';

describe('SiteAdministratorsComponent', () => {
  let component: SiteAdministratorsComponent;
  let fixture: ComponentFixture<SiteAdministratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteAdministratorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteAdministratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
