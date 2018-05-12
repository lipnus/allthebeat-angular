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
  aaa;

  constructor(private postToServerService: PostToServerService,
    private http: HttpClient,
    private router: Router,
    private domSanitizer : DomSanitizer ) { }

  ngOnInit() {
    this.recCount=1;
    this.postRecommend("request", 0);
  }



  setYoutubePath(youtubePath:string){
    let pathArray = youtubePath.split("=");
    this.youtubePath = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + pathArray[pathArray.length-1]);
  }



  postRecommend(type:string, score:number){
    var path = "/recommend";
    var postData = {
      token:0,
      type:type,
      // recommend_pk:this.soundRecommend.recommend_pk,
      // bpm:this.soundRecommend.bpm,
      // genre1:this.soundRecommend.genre1,
      // genre2:this.soundRecommend.genre2,
      // mood1:this.soundRecommend.mood1,
      // mood2:this.soundRecommend.mood2,
      // mood3:this.soundRecommend.mood3,
      // score:score
    };

    this.postToServerService.postServer(path, postData).subscribe(data => {
      console.log(data.youtube);
      this.soundRecommend = data;
      this.setYoutubePath(data.youtube);
      this.recCount++;
    });
  }

  onClick_score(score:number){
    this.postRecommend("answwer", score);
  }
}
