import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MybeatComponent } from './mybeat.component';

describe('MybeatComponent', () => {
  let component: MybeatComponent;
  let fixture: ComponentFixture<MybeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MybeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MybeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
