import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoujiComponent } from './shouji.component';

describe('ShoujiComponent', () => {
  let component: ShoujiComponent;
  let fixture: ComponentFixture<ShoujiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoujiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoujiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
