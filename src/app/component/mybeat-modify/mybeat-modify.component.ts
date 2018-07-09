import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { Router } from '@angular/router';


// const URL = 'http://localhost:9000/upload';
// const URL = 'http://allthebeat.com:9000/upload';
// const URL = mGlobal.ServerPath + '/upload';

//[Service]
import { PostToServerService } from '../../service/post-to-server.service';

//[model]
import {GenreList, MoodList, SoundUpload} from "../../model/index";

import * as mGlobal from '../../global-variables';
import {SoundData} from "../../model/sound-list";
import {SoundDetail} from "../../model/sound-detail";  //전역변수



@Component({
  selector: 'app-mybeat-modify',
  templateUrl: './mybeat-modify.component.html',
  styleUrls: ['./mybeat-modify.component.css']
})
export class MybeatModifyComponent implements OnInit {

  soundUpload: SoundUpload;
  soundData: SoundData;

  soundDetail: SoundDetail;
  soundCount: number;
  sound_pk: any;

  constructor(private http: Http,
              private postToServerService:PostToServerService,
              private router: Router,) {

    //경로 뒤에 붙은 숫자 가져오기
    router.events.subscribe(e => {
      if (!this.sound_pk) {
        this.sound_pk = true;
      }
    });
  }


  ngOnInit() {

    if (localStorage.getItem('auth')) {
      let auth = JSON.parse(localStorage.getItem('auth'));
      let token = auth.token;
      this.postSoundDetail(this.sound_pk, token);

    }else{
      alert("재 로그인이 필요합니다");
      this.router.navigate(['/mainpage']);
    }
  }


  //sound_detail을 재활용
  postSoundDetail(sound_pk:number, token:string){
    let path = '/sound_detail';
    let postData = {token:token, sound_pk: sound_pk};
    this.postToServerService.postServer(path, postData).subscribe(data => {

      this.soundDetail = data;

    });
  }


  postMybeat(token:string){
    let path = '/mybeat';
    token = "AAAAPC53o48Fw5B52qH69TSU+eYpioskuPIeF05bvJH53EVRA+BEqwTL2cXsOG2s+/N13+zMWB4n3kJjHV5mC3iJ2Qw=";
    let postData = {token:token};

    this.postToServerService.postServer(path, postData).subscribe(data => {
      this.soundData = data;
      this.applyArtworkPath(); //이미지경로에 서버위치 붙여주기

      //전체 음원개수
      this.soundCount = this.soundData.sound_list.length;
    });
  }

  //이미지 경로를 완성시켜줌
  applyArtworkPath(){

    for(var i=0; i<this.soundData.sound_list.length; i++){
      this.soundData.sound_list[i].img_path
        = mGlobal.ArtworkPath + "/" + this.soundData.sound_list[i].img_path;
    }
  }



  //서버로 음원정보 전송
  postSoundUpload(){

    let path = '/upload/dbdata';

    //토큰 가져오기
    let auth = JSON.parse(localStorage.getItem('auth'));
    let token = auth.token;

    let postData = {token: token, data:this.soundUpload};
    this.postToServerService.postServer(path, postData).subscribe(data => {

      //post콜백
      console.log("서버로부터 받은값: " , data);

      alert("업로드 완료!");
      this.router.navigate(['/mainpage']);
    });

  }

   //업로드버튼 클릭
  public onClick_upload():void{

    // this.postSoundUpload();

    if(this.soundUpload.sound_name == undefined){
      alert("title을 입력해주세요");
    }else if(this.soundUpload.bpm == undefined){
      alert("bpm을 입력해주세요")
    }else if(this.soundUpload.license == undefined){
      alert("license를 입력해주세요");
    }else if(this.soundUpload.genre1 == undefined){
      alert("genre1을 입력해주세요");
    }else if(this.soundUpload.genre2 == undefined){
      alert("genre2을 입력해주세요");
    }else if(this.soundUpload.mood1 == undefined){
      alert("mood1을 입력해주세요");
    }else if(this.soundUpload.mood2 == undefined){
      alert("mood2을 입력해주세요");
    }else if(this.soundUpload.mood3 == undefined){
      alert("mood3을 입력해주세요");
    }

    else{

    }
  }

  //bpm숫자 범위체크
  bpmCheck(){
    if(this.soundUpload.bpm < 0){
      this.soundUpload.bpm = 0;
    }else if(this.soundUpload.bpm>999){
      this.soundUpload.bpm = 10;
    }
  }

  public onClick_delete(){

  }


}
