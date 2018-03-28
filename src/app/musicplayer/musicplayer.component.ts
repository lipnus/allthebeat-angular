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

  stateImgPath: string;
  playstate: boolean;

  showPlayer: boolean;


  constructor(private messageService: MessageService,) {

    //음악 선택을 했을 때의 콜백
    this.subscription = this.messageService.getMusicInfo().subscribe(musicInfo => {
      this.musicInfo = musicInfo;

      this.startMusic();

      // console.log(this.musicInfo);
    });
  }

  ngOnInit() {
    this.audio = new Audio();
    this.playstate = false;
    this.showPlayer = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

    if(this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }

  startMusic(){
    this.stateImgPath = "assets/play.png";
    this.showPlayer = true;
    this.playstate = true;

    this.audio.src = mGlobal.SoundPath + this.musicInfo.sound_path;
    this.audio.load();
    this.audio.play();
  }

  pauseMusic(){
    this.stateImgPath = "assets/pause.png";
    this.playstate = false;
    this.audio.pause();
  }



  onClick_state(){
    if(this.playstate){
      this.pauseMusic();
    }else{
      this.startMusic();
    }

  }

}
