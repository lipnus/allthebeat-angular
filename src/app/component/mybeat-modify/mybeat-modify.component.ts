import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import {ActivatedRoute, Router} from '@angular/router';


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

  // soundUpload: SoundUpload;
  soundData: SoundData;

  soundDetail: SoundDetail;
  soundCount: number;
  sound_pk: any;

  constructor(private http: Http,
              private postToServerService:PostToServerService,
              private route: ActivatedRoute,
              private router: Router,) {

    //경로 뒤에 붙은 숫자 가져오기
    this.sound_pk = route.snapshot.paramMap.get('sound_pk');
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
      console.log("받은값:", data);

    });
  }


  postMybeatDelete(sound_pk:number){
    let path = '/mybeat/delete';
    let postData = {sound_pk:sound_pk};

    this.postToServerService.postServer(path, postData).subscribe(data => {
      alert("삭제가 완료되었습니다");
      this.router.navigate(['./mybeat']);
    });
  }

  postMybeatModify(sound_pk:number){
    let path = '/mybeat/delete';
    let postData = {sound_pk:sound_pk, };

    this.postToServerService.postServer(path, postData).subscribe(data => {
      alert("삭제가 완료되었습니다");
      this.router.navigate(['./mybeat']);
    });
  }




   //업로드버튼 클릭
  public onClick_upload():void{

    if(this.soundDetail.sound_name == undefined){
      alert("title을 입력해주세요");
    }else if(this.soundDetail.sound_bpm == undefined){
      alert("bpm을 입력해주세요")
    }else if(this.soundDetail.genre1 == undefined){
      alert("genre1을 입력해주세요");
    }else if(this.soundDetail.genre2 == undefined){
      alert("genre2을 입력해주세요");
    }else if(this.soundDetail.mood1 == undefined){
      alert("mood1을 입력해주세요");
    }else if(this.soundDetail.mood2 == undefined){
      alert("mood2을 입력해주세요");
    }else if(this.soundDetail.mood3 == undefined){
      alert("mood3을 입력해주세요");
    }
    else{
      alert("수정이 완료되었습니다");
    }
  }

  //bpm숫자 범위체크
  bpmCheck(){
    if(this.soundDetail.sound_bpm < 0){
      this.soundDetail.sound_bpm = 0;
    }else if(this.soundDetail.sound_bpm>999){
      this.soundDetail.sound_bpm = 10;
    }
  }

  public onClick_delete(){
    var result = confirm("정말로 삭제하시겠습니까?");
    if(result){
      this.postMybeatDelete(this.sound_pk);
    }else{
    }
  }


}
