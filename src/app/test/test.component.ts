import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PostToServerService } from '../service/post-to-server.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TestPost } from '../model/test-post';
import * as mGlobal from '../global-variables';  //전역변수


@Component({
  selector: 'app-root',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})




export class TestComponent implements OnInit {

  testValue = '테스트';
  testArray: string[];
  testPost: TestPost;
  globalValue;
  btnClicked:boolean;

  constructor( private postTestService: PostToServerService,
               private http: HttpClient,){
  }


  ngOnInit(){
    this.testArray = ['하나', '둘', '셋', '넷', '다섯'];
    this.globalValue = mGlobal.ServerPath;

    this.btnClicked = false;

    this.postTest();
  }


  postTest(){
    var path = '/test';
    var postData = {input: "fucking"};
    this.postTestService.postServer(path, postData).subscribe(data => {
      this.testPost = data;
      console.log( this.testPost.result );
    });
  }

  onClick_test(){
    if(this.btnClicked){
      this.btnClicked=false;
    }else if(!this.btnClicked){
      this.btnClicked=true;
    }
  }


}
