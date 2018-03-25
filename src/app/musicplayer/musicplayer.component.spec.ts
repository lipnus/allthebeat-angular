import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicplayerComponent } from './musicplayer.component';

describe('MusicplayerComponent', () => {
  let component: MusicplayerComponent;
  let fixture: ComponentFixture<MusicplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
