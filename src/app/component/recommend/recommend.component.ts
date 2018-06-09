import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostToServerService } from '../../service/post-to-server.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//[model]
import { SoundRecommend } from '../../model';
import * as mGlobal from '../../global-variables';  //전역변수
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})


export class RecommendComponent implements OnInit {

  recCount:number;
  youtubePath;
  soundRecommend:SoundRecommend; //추천데이터 정보
  avgBpm:number; //평균bpm (서버에서 받은 전체 bpm을 횟수로 나눎)
  aaa;
  isLoaded:boolean;

  constructor(private postToServerService: PostToServerService,
    private http: HttpClient,
    private router: Router,
    private domSanitizer : DomSanitizer ) { }

  ngOnInit() {
    this.isLoaded=false;
    this.recCount=0;
    this.soundRecommend = new SoundRecommend();
    // localStorage.setItem('auth', JSON.stringify({ token: "AAAAONniP+UVUFCIWloEWxN+P/ilyYwx9l1bUlYJ47+HAdZAfybrPJzvhbhwr5mX9CDhqogZ3Zk4EJa7dQsVxH39img=" }));

    if (localStorage.getItem('auth')) {
        let auth = JSON.parse(localStorage.getItem('auth'));
        this.postRecommend("request", 0, auth.token);
    }
  }



  setYoutubePath(youtubePath:string){
    let pathArray;

    if(youtubePath.indexOf('=')){
      pathArray = youtubePath.split("=");
    }else{
      pathArray = youtubePath.split("/");
    }

    this.youtubePath = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + pathArray[pathArray.length-1] + '?autoplay=1');
  }

  postRecommend(type:string, score:number, token:string){
    var path = "/recommend";
    var postData = {
      token:token,
      type:type,
      recommend_pk:this.soundRecommend.recommend_pk,
      bpm:this.soundRecommend.bpm,
      genre1:this.soundRecommend.genre1,
      genre2:this.soundRecommend.genre2,
      mood1:this.soundRecommend.mood1,
      mood2:this.soundRecommend.mood2,
      mood3:this.soundRecommend.mood3,
      score:score
    };

    this.postToServerService.postServer(path, postData).subscribe(data => {
      console.log(data);

      this.isLoaded=true;

      if(data.result=="ok"){
        this.soundRecommend = data;
        this.setYoutubePath(data.youtube);
        this.recCount++;

        console.log("카운트: " + data.rec_count);

        // console.log("장르: " + this.soundRecommend.rank_genre1 + " , " + this.soundRecommend.rank_genre2);
        // console.log("무드: " + this.soundRecommend.rank_mood1 + " , " + this.soundRecommend.rank_mood2);


      }else if(data.result=="token_error"){
        //유효하지 않은 토큰
        localStorage.removeItem('auth');
      }

    });
  }

  onClick_score(score:number){
    // localStorage.setItem('auth', JSON.stringify({ token: "AAAAONniP+UVUFCIWloEWxN+P/ilyYwx9l1bUlYJ47+HAdZAfybrPJzvhbhwr5mX9CDhqogZ3Zk4EJa7dQsVxH39img=" }));

    if (localStorage.getItem('auth')) {
        let auth = JSON.parse(localStorage.getItem('auth'));
        this.postRecommend("answer", score, auth.token);
    }
  }

  onClick_reset(){

    if (localStorage.getItem('auth')) {
        var auth = JSON.parse(localStorage.getItem('auth'));
        var path = "/recommend/reset";
        var postData = {
          token:auth.token,
        };

        this.postToServerService.postServer(path, postData).subscribe(data => {

          //onInit과 동일한 과정
          this.isLoaded=false;
          this.recCount=0;
          this.soundRecommend = new SoundRecommend();

          if (localStorage.getItem('auth')) {
              let auth = JSON.parse(localStorage.getItem('auth'));
              this.postRecommend("request", 0, auth.token);
          }

        });
    }//if
  }

}
