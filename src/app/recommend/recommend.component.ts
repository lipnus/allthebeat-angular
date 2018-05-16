import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostToServerService } from '../service/post-to-server.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//[model]
import { SoundRecommend } from '../model';

import * as mGlobal from '../global-variables';  //전역변수

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

  constructor(private postToServerService: PostToServerService,
    private http: HttpClient,
    private router: Router,
    private domSanitizer : DomSanitizer ) { }

  ngOnInit() {
    this.recCount=0;
    this.soundRecommend = new SoundRecommend();
    this.postRecommend("request", 0);
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

  postRecommend(type:string, score:number){
    var path = "/recommend";
    var postData = {
      token:0,
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
      this.soundRecommend = data;
      this.setYoutubePath(data.youtube);

      // this.avgBpm = data.bpm_sum / data.rec_count;
      this.recCount++;
    });
  }

  onClick_score(score:number){
    this.postRecommend("answer", score);
  }

  onClick_reset(){

    var path = "/recommend/reset";
    var postData = {
      token:0,
    };

    this.postToServerService.postServer(path, postData).subscribe(data => {
        this.soundRecommend.rec_count = 0;
        this.soundRecommend.rank_genre1 = "0";
        this.soundRecommend.rank_genre2 = "0";
        this.soundRecommend.rank_mood1 = "0";
        this.soundRecommend.rank_mood2 = "0";


    });
  }
}
