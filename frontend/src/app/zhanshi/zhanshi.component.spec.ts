import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZhanshiComponent } from './zhanshi.component';

describe('ZhanshiComponent', () => {
  let component: ZhanshiComponent;
  let fixture: ComponentFixture<ZhanshiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZhanshiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZhanshiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
