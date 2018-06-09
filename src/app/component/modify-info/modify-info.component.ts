import { Component, OnInit } from '@angular/core';
import { PostToServerService } from '../../service/post-to-server.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import * as mGlobal from '../../global-variables';  //전역변수
import { UserData } from '../../model';

@Component({
  selector: 'app-modify-info',
  templateUrl: './modify-info.component.html',
  styleUrls: ['./modify-info.component.css']
})
export class ModifyInfoComponent implements OnInit {

  userData: UserData;
  type:string;//html에서  join인지 modify인지 알기 위해서

  constructor(private postTestService: PostToServerService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
    this.userData = new UserData();

    if (localStorage.getItem('auth')) {
      var auth = JSON.parse(localStorage.getItem('auth'));
      this.postUser(auth.token);
    }

  }

  //토큰을 이용하여 유저정보를 받아온다
  postUser(token){
    var path = '/user';
    var postData = {token: token};
    this.postTestService.postServer(path, postData).subscribe(data => {
      this.userData = data;
    });
  }

  //서버로 정보를 보냄
  sendUserInfo(){
    if(this.userData.nickname==""){
      alert("닉네임을 입력해주세요");
    }else if(this.userData.mobile==""){
      alert("연락처를 입력해주세요");
    }else{
      this.postUpdateUser();
    }
  }

  //유저의 정보를 갱신한다
  postUpdateUser(){
  var path = '/user_update';
  var postData =
  {
    token: JSON.parse(localStorage.getItem('auth')).token,
    nickname:this.userData.nickname,
    mobile:this.userData.mobile,
    sns:this.userData.sns,
    introduce:this.userData.introduce
  };

  this.postTestService.postServer(path, postData).subscribe(data => {
    this.userData = data;

    this.router.navigate(['/soundlist']);

  });
  }

}
