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
  aaa;

  constructor(private postToServerService: PostToServerService,
    private http: HttpClient,
    private router: Router,
    private domSanitizer : DomSanitizer ) { }

  ngOnInit() {
    this.recCount=1;
    this.youtubePath = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/VSZ4HwlUSXU');
  }



  postRecommend(){
    var path = "/recommend";
    var postData = {token:0, type:"request"};
    this.postToServerService.postServer(path, postData).subscribe(data => {
      console.log(data.youtube);
      this.youtubePath = data.youtube;
      this.recCount++;
    });
  }

  onClick_score(score:number){
    this.postRecommend();
  }


}
