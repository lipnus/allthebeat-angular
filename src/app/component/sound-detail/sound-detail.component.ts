import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { PostToServerService } from '../../service/post-to-server.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../../service/message.service';

// [model]
import { SoundDetail } from '../../model/sound-detail';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import * as mGlobal from '../../global-variables';  //전역변수


import { ClipboardModule } from 'ngx-clipboard';


@Component({
  selector: 'app-sound-detail',
  templateUrl: './sound-detail.component.html',
  styleUrls: ['./sound-detail.component.css']
})
export class SoundDetailComponent implements OnInit {

  sound_pk;
  _reloadData;
  artworkPath:string;

  soundDetail: SoundDetail;
  genreTag: string = "";
  moodTag: string = "";
  typeTag: string = "";

  playImg:string;

  test;

  hereURL:string; //클립보드에 저장될 현재경로



  constructor( private postTestService: PostToServerService,
    private http: HttpClient,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,){

    //경로 뒤에 붙은 숫자 가져오기
    router.events.subscribe(e => {
      if (!this._reloadData) {
        this._reloadData = true;
      }
    });
  }

  ngOnInit() {
    this.playImg = "assets/circle-play.png";
    this.artworkPath = "";
  }

  private ngDoCheck() {
    if (this._reloadData) {
      this._reloadData = false;
      this.resetData();
    }
  }

  //같은페이지를 다시 불렀을때(플레이어에서 곡제목터치) 새로운 값으로 뜨게 하기위해서
  resetData(){
    this.sound_pk = this.route.snapshot.paramMap.get('sound_pk');
    window.scrollTo(0, 0);

    console.log("NowPK: " + this.sound_pk);
    this.postSoundDetail( this.sound_pk );

    //클립보드 경로 설정
    this.hereURL = mGlobal.detailDomainPath + this.sound_pk;
  }

  postSoundDetail(pk:number){
    var path = '/sound_detail';
    var token = 0;

    //로그인상태이면 토큰을 보내고 아니면 0을 보냄
    if (localStorage.getItem('auth')) {
        var auth = JSON.parse(localStorage.getItem('auth'));
        token = auth.token;
        console.log("저장된 토큰 :" + token);
    }else{
        console.log("저장된 토큰없음");
    }


    var postData = {token:token, sound_pk: pk};
    this.postTestService.postServer(path, postData).subscribe(data => {

      this.soundDetail = data;
      this.setTypeTag();
      this.setMoodTag();
      this.setGenreTag();
      this.applyArtwork();

      if(this.soundDetail.login == 0){
        //무효한 토큰을 가진경우 지울 수 있도록 한다(없는경우도 여기걸림)
        console.log("토큰이 없거나 무효, 삭제처리");
        localStorage.removeItem('auth');
      }

      // console.log( this.soundDetail );

    });
  }

  applyArtwork(){
    //아트워크 경로 설정
    this.artworkPath = mGlobal.ArtworkPath + "/" + this.soundDetail.img_path;
  }

  //이미지를 터치하면 현재 비트를 재생
  onClick_startMusic(){
    var playSound = this.soundDetail;
    var soundPk = playSound.sound_pk;
    var soundName = playSound.sound_name;
    var beatmakerNickname = playSound.beatmaker_nickname;
    var soundPath = playSound.sound_path;

    this.messageService.sendMusicInfo(soundPk, soundName, beatmakerNickname, soundPath);
  }


  //좋아요
  onClick_like(sound_pk, index){
    if (localStorage.getItem('auth')) {
      this.soundDetail.like_my = 1;
      this.soundDetail.like_count++;
      this.postUserLike(this.soundDetail.sound_pk, 1);
    }else{
      this.router.navigate(['/login']);
    }

  }

  //좋아요 취소
  onClick_dislike(){
    if (localStorage.getItem('auth')) {
      this.soundDetail.like_my = 0;
      this.soundDetail.like_count--;
      this.postUserLike(this.soundDetail.sound_pk, -1);
    }else{
      this.router.navigate(['/login']);
    }
  }

  //현재경로를 클립보드에 저장
  onClick_copyurl(){
    alert("클립보드에 복사되었습니다!");
  }



  //서버로 좋아요 값 전송
  postUserLike(sound_pk, heart){
    var path = '/user_like';
    var auth = JSON.parse(localStorage.getItem('auth'));
    var token = auth.token;

    var postData = {token:token, sound_pk:sound_pk, heart:heart};
    this.postTestService.postServer(path, postData).subscribe(data => {
      console.log("like처리");
    });
  }



  setGenreTag(){
    if(this.soundDetail.genre1!=""){
      this.genreTag += "#" + this.soundDetail.genre1 + "  "
    }
    if(this.soundDetail.genre2!=""){
      this.genreTag += "#" + this.soundDetail.genre2 + "  "
    }
  }

  setMoodTag(){
    if(this.soundDetail.mood1!=""){
      this.moodTag += "#" + this.soundDetail.mood1 + " "
    }
    if(this.soundDetail.mood2!=""){
      this.moodTag += "#" + this.soundDetail.mood2 + "  "
    }
    if(this.soundDetail.mood3!=""){
      this.moodTag += "#" + this.soundDetail.mood3 + "  "
    }
  }

  setTypeTag(){
    if(this.soundDetail.type1!="" ){
      this.typeTag += "#" + this.soundDetail.type1 + "  "
    }
    if(this.soundDetail.type2!=""){
      this.typeTag += "#" + this.soundDetail.type2 + "  "
    }
    if(this.soundDetail.type3!=""){
      this.typeTag += "#" + this.soundDetail.type3 + "  "
    }
  }

}
