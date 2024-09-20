import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WelcomeScreenPage } from './welcome-screen.page';


describe('WelcomeScreenPage', () => {
  let component: WelcomeScreenPage;
  let fixture: ComponentFixture<WelcomeScreenPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeScreenPage ],
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
