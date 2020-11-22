import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBillsByAccountComponent } from './view-bills-by-account.component';

describe('ViewBillsByAccountComponent', () => {
  let component: ViewBillsByAccountComponent;
  let fixture: ComponentFixture<ViewBillsByAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBillsByAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBillsByAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
