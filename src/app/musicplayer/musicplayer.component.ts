import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../service/message.service';
import { Router } from '@angular/router';

import * as mGlobal from '../global-variables';  //전역변수

@Component({
  selector: 'app-musicplayer',
  templateUrl: './musicplayer.component.html',
  styleUrls: ['./musicplayer.component.css']
})
export class MusicplayerComponent implements OnInit, OnDestroy {

  audio;
  subscription: Subscription;
  musicInfo: any;
  message: any;

  stateImgPath: string;
  playstate: boolean;
  showPlayer: boolean;

  test;

  musicCurrentLocation:number; //현재재생위치
  musicDuration:number; //음악의 전체 길이


  constructor(private messageService: MessageService,) {

    //음악 선택을 했을 때의 콜백
    this.subscription = this.messageService.getMusicInfo().subscribe(musicInfo => {

      this.musicInfo = musicInfo;
      this.startMusic();
      // console.log(this.musicInfo);
      });
  }

  ngOnInit() {

    //음악관련 설정값 초기화
    this.audio = new Audio();
    this.playstate = false;
    this.showPlayer = false;

    this.musicCurrentLocation=0;
    this.musicDuration = 1;

    //재생중일때
    this.audio.addEventListener("timeupdate", (currentTime)=>{
      // console.log("cur: " + this.audio.currentTime);
      this.musicCurrentLocation = this.audio.currentTime;
    });

    //최대길이가 변경되었을때
    this.audio.addEventListener("durationchange", (currentTime)=>{
      console.log("Duration: " + this.audio.duration);
      this.musicDuration = this.audio.duration;
    });

    //재생이 끝났을때
    this.audio.addEventListener("ended", (currentTime)=>{
      // console.log("Duration: " + this.audio.duration);
      console.log("끝!");
      this.stopMusic();
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

    if(this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }


  startMusic(){
    this.stateImgPath = "assets/pause.png";
    this.showPlayer = true;
    this.playstate = true;

    this.audio.src = mGlobal.SoundPath + this.musicInfo.sound_path;
    this.audio.load();
    this.audio.play();
  }


  pauseMusic(){
    this.stateImgPath = "assets/play.png";
    this.playstate = false;
    this.audio.pause();
  }

  resumeMusic(){
    this.stateImgPath = "assets/pause.png";
    this.playstate = true;
    this.audio.play();
  }

  stopMusic(){
    this.stateImgPath = "assets/play.png";
    this.playstate = false;
    this.audio.pause();
    this.audio.currentTime = 0;
  }


  onClick_state(){
    if(this.playstate){
      this.pauseMusic();
    }else{
      this.resumeMusic();
    }
  }
}
