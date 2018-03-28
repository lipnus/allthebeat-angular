import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { PostTestService } from '../service/post-test.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../service/message.service';

// [model]
import { SoundData } from '../model/sound-list';
import { SoundListDetail } from '../model/sound-list-detail';

import * as mGlobal from '../global-variables';  //전역변수


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
})




export class MainpageComponent implements OnInit {

  soundData: SoundData;
  globalValue;
  btnClicked:boolean;
  soundCount;



  constructor( private postTestService: PostTestService,
               private http: HttpClient,
               private messageService: MessageService,){
  }

  sendMessage(): void {
    this.messageService.sendMessage('오지고 지리고 렛잇고');
  }

  sendMusicInfo(): void {
    this.messageService.sendMusicInfo(11, "노래이름", "비트메이커", "경로");
  }

  clearMessage(): void {
      this.messageService.clearMessage();
  }


  ngOnInit(){
    this.globalValue = mGlobal.ServerPath;

    this.soundCount=0;
    this.soundData ={};
    this.postSoundList();
  }

  onClick_test(){
    console.log("회색클릭");
    // this.sendMessage();
    this.sendMusicInfo();
  }


  postSoundList(){
    var path = '/sound_list';
    var postData = {user_pk:2};
    this.postTestService.postServer(path, postData).subscribe(data => {
      this.soundData = data;
      // console.log( this.soundData );

      this.soundCount = this.soundData.sound_list.length +
                        this.soundData.sound_recommend_list.length;
    });
  }

  //상단의 추천 5개음악 재생
  onClick_startRecommendMusic(soundIndex: int){
    // console.log("누른번호:" + soundIndex);
    var playSound = this.soundData.sound_recommend_list[soundIndex];
    var soundPk = playSound.sound_pk;
    var soundName = playSound.sound_name;
    var beatmakerNickname = playSound.beatmaker_nickname;
    var soundPath = playSound.sound_path;

    this.messageService.sendMusicInfo(soundPk, soundName, beatmakerNickname, soundPath);
  }

  //전체 음악 재생
  onClick_startMusic(soundIndex: int){
    // console.log("누른번호:" + soundIndex);
    var playSound = this.soundData.sound_list[soundIndex];
    var soundPk = playSound.sound_pk;
    var soundName = playSound.sound_name;
    var beatmakerNickname = playSound.beatmaker_nickname;
    var soundPath = playSound.sound_path;

    this.messageService.sendMusicInfo(soundPk, soundName, beatmakerNickname, soundPath);
  }




}
