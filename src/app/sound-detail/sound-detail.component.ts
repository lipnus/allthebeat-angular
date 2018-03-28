import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { PostTestService } from '../service/post-test.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../service/message.service';

// [model]
import { SoundDetail } from '../model/sound-detail';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import * as mGlobal from '../global-variables';  //전역변수



@Component({
  selector: 'app-sound-detail',
  templateUrl: './sound-detail.component.html',
  styleUrls: ['./sound-detail.component.css']
})
export class SoundDetailComponent implements OnInit {

  sound_pk:number;
  soundDetail: SoundDetail;
  genreTag: string = "";
  moodTag: string = "";
  typeTag: string = "";


  constructor( private postTestService: PostTestService,
               private http: HttpClient,
               private messageService: MessageService,
               private route: ActivatedRoute,){
  }

  ngOnInit() {
    this.sound_pk = this.route.snapshot.paramMap.get('sound_pk');
    console.log("현재PK: " + this.sound_pk);

    this.postSoundDetail( this.sound_pk );
  }

  postSoundDetail(pk:number){
    var path = '/sound_detail';
    var postData = {user_pk:2, sound_pk: pk};
    this.postTestService.postServer(path, postData).subscribe(data => {
      this.soundDetail = data;
      this.setTypeTag();
      this.setMoodTag();
      this.setGenreTag();
      console.log( this.soundDetail );
    });
  }

  //이미지를 터치하면 현재 비트를 재생
  onClick_startMusic(){
    console.log("ㅆㅂ");
    var playSound = this.soundDetail;
    var soundPk = playSound.sound_pk;
    var soundName = playSound.sound_name;
    var beatmakerNickname = playSound.beatmaker_nickname;
    var soundPath = playSound.sound_path;

    this.messageService.sendMusicInfo(soundPk, soundName, beatmakerNickname, soundPath);
  }

  

  setGenreTag(){
    if(this.soundDetail.genre1!=""){
      this.genreTag += "#" + this.soundDetail.genre1 + " "
    }
    if(this.soundDetail.genre2!=""){
      this.genreTag += "#" + this.soundDetail.genre2 + " "
    }
  }

  setMoodTag(){
    if(this.soundDetail.mood1!=""){
      this.moodTag += "#" + this.soundDetail.mood1 + " "
    }
    if(this.soundDetail.mood2!=""){
      this.moodTag += "#" + this.soundDetail.mood2 + " "
    }
    if(this.soundDetail.mood3!=""){
      this.moodTag += "#" + this.soundDetail.mood3 + " "
    }
  }

  setTypeTag(){
    if(this.soundDetail.type1!="" ){
      this.typeTag += "#" + this.soundDetail.type1 + " "
    }
    if(this.soundDetail.type2!=""){
      this.typeTag += "#" + this.soundDetail.type2 + " "
    }
    if(this.soundDetail.type3!=""){
      this.typeTag += "#" + this.soundDetail.type3 + " "
    }
  }

}
