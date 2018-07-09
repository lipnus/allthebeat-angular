import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { PostToServerService } from '../../service/post-to-server.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../../service/message.service';

// [model]
import { SoundData } from '../../model/sound-list';
import { SoundListDetail } from '../../model/sound-list-detail';
import * as mGlobal from '../../global-variables';  //전역변수


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
  artworkPath:string;
  recommendTitle:string;

  playImg;


  constructor( private postToServerService: PostToServerService,
               private http: HttpClient,
               private messageService: MessageService,
               private router: Router,){

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
    console.log("main Init");
    this.globalValue = mGlobal.ServerPath;

    this.playImg = "assets/circle-play.png";
    this.artworkPath = mGlobal.ArtworkPath;
    this.soundCount=0;
    this.recommendTitle = "랜덤추천비트";

    // localStorage.setItem('auth', JSON.stringify({ token: "AAAAOEx7xio1eKvdYMgvonoWESz6HOaPkyvIcZImLzVK66nACdtaMgYE/dcAXnqnRVTiSZXOGtDAFflH6Yu9JnkqmDc=" }));

    this.postSoundList();

  }


  //서버로 음원리스트 요청
  postSoundList(){
    var path = '/sound_list';
    var token = 0;

    //로그인상태이면 토큰을 보내고 아니면 0을 보냄
    if (localStorage.getItem('auth')) {
        var auth = JSON.parse(localStorage.getItem('auth'));
        token = auth.token;
    }

    var postData = {token:token};
    this.postToServerService.postServer(path, postData).subscribe(data => {
      this.soundData = data;
      this.applyArtworkPath(); //이미지경로에 서버위치 붙여주기

      if(this.soundData.login == 0){
        //무효한 토큰을 가진경우 지울 수 있도록 한다(없는경우도 여기걸림)
        // console.log("토큰이 없거나 무효, 삭제처리");
        localStorage.removeItem('auth');
      }else{
        // console.log("정상로그인처리");
      }

      //로그인은 하였으나 추천을 완료하지 않음
      if(this.soundData.login==1 && this.soundData.recommend==0){
        // 강제이동
        // this.router.navigate(['/recommend']);
      }

      //추천완료
      if(this.soundData.recommend==1){
        this.recommendTitle = "맞춤추천비트";
      }

      //전체 음원개수
      this.soundCount = this.soundData.sound_list.length +
                        this.soundData.sound_recommend_list.length;
    });
  }


  //이미지 경로를 완성시켜줌
  applyArtworkPath(){

    for(var i=0; i<this.soundData.sound_list.length; i++){
      this.soundData.sound_list[i].img_path
      = mGlobal.ArtworkPath + "/" + this.soundData.sound_list[i].img_path;
    }

    for(var i=0; i<this.soundData.sound_recommend_list.length; i++){
      this.soundData.sound_recommend_list[i].img_path
      = mGlobal.ArtworkPath + "/" + this.soundData.sound_recommend_list[i].img_path;
    }

  }


  //상단의 추천 5개음악 재생
  onClick_startRecommendMusic(soundIndex: number){
    // console.log("누른번호:" + soundIndex);

    var playSound = this.soundData.sound_recommend_list[soundIndex];
    var soundPk = playSound.sound_pk;
    var soundName = playSound.sound_name;
    var beatmakerNickname = playSound.beatmaker_nickname;
    var soundPath = playSound.sound_path;

    this.messageService.sendMusicInfo(soundPk, soundName, beatmakerNickname, soundPath);
  }


  //전체 음악 재생
  onClick_startMusic(soundIndex: number){
    // console.log("누른번호:" + soundIndex);
    var playSound = this.soundData.sound_list[soundIndex];
    var soundPk = playSound.sound_pk;
    var soundName = playSound.sound_name;
    var beatmakerNickname = playSound.beatmaker_nickname;
    var soundPath = playSound.sound_path;

    this.messageService.sendMusicInfo(soundPk, soundName, beatmakerNickname, soundPath);
  }


  //추천곡 좋아요
  onClick_recommend_like(sound_pk, index){
    if (localStorage.getItem('auth')) {
          this.soundData.sound_recommend_list[index].like_my = 1;
          this.postUserLike(sound_pk, +1);
    }else{
      alert("로그인이 필요합니다");
      // this.router.navigate(['/login']);
    }

  }

  //추천곡 좋아요 취소
  onClick_recommend_dislike(sound_pk, index){
    if (localStorage.getItem('auth')) {
          this.soundData.sound_recommend_list[index].like_my = 0;
          this.postUserLike(sound_pk, -1);
    }else{
      alert("로그인이 필요합니다");
      // this.router.navigate(['/login']);
    }
  }

  //좋아요
  onClick_like(sound_pk, index){
    if (localStorage.getItem('auth')) {
          this.soundData.sound_list[index].like_my = 1;
          this.postUserLike(sound_pk, 1);
    }else{
      alert("로그인이 필요합니다");
      // this.router.navigate(['/login']);
    }
  }

  //좋아요 취소
  onClick_dislike(sound_pk, index){
    if (localStorage.getItem('auth')) {
          this.soundData.sound_list[index].like_my = 0;
          this.postUserLike(sound_pk, -1);
    }else{
      alert("로그인이 필요합니다");
      // this.router.navigate(['/login']);
    }
  }

  //서버로 좋아요 값 전송
  postUserLike(sound_pk, heart){
    var path = '/user_like';
    var auth = JSON.parse(localStorage.getItem('auth'));
    var token = auth.token;

    var postData = {token:token, sound_pk:sound_pk, heart:heart};
    this.postToServerService.postServer(path, postData).subscribe(data => {
      console.log("like처리");
    });
  }

  onClick_recommend(){
    this.router.navigate(['/recommend']);
  }
}
