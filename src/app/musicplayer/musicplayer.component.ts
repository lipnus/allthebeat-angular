import { Component, OnInit } from '@angular/core';

import { MessageService } from '../service/message.service';

import * as mGlobal from '../global-variables';  //전역변수

@Component({
  selector: 'app-musicplayer',
  templateUrl: './musicplayer.component.html',
  styleUrls: ['./musicplayer.component.css']
})
export class MusicplayerComponent implements OnInit, OnDestroy {

  audio: Audio;
  subscription: Subscription;
  musicInfo: any;
  message: any;

  constructor(private messageService: MessageService,) {
    this.subscription = this.messageService.getMusicInfo().subscribe(musicInfo => {
      this.musicInfo = musicInfo;
    });
  }

  ngOnInit() {
    this.audio = new Audio();
    this.audio.src = '../assets/sound/DOPE/Amadeus - 최재영.mp3';
    this.audio.load();
    this.audio.play();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

    if(this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }

}
