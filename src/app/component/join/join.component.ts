import { Component, OnInit } from '@angular/core';
import { PostToServerService } from '../../service/post-to-server.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import * as mGlobal from '../../global-variables';  //전역변수
import { UserData } from '../../model/index';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  userData: UserData;
  type:string;//html에서  join인지 modify인지 알기 위해서

  constructor(private postTestService: PostToServerService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
    this.userData = new UserData();
    var state = this.route.snapshot.paramMap.get('state');

    console.log(state);
    this.postToken(state);
    this.type="join";
  }

  //코드를 이용하여 토큰을 받아온다
  postToken(state){
    var path = '/auth_naver/token_please';
    var postData = {state: state};
    this.postTestService.postServer(path, postData).subscribe(data => {

      localStorage.setItem('auth', JSON.stringify({ token: data.token }));
      // console.log("받은토큰: "+ data.token);

      var aaa = JSON.parse(localStorage.getItem('auth'));
      // console.log("저장된토큰: " + aaa.token);

      this.postUser(data.token);

    });
  }

  //토큰을 이용하여 유저정보를 받아온다
  postUser(token){
    var path = '/user';
    var postData = {token: token};
    this.postTestService.postServer(path, postData).subscribe(data => {
      this.userData = data;

      // //닉네임이 없을 시 이름으로 대체
      // if(this.userData.nickname == ""){
      //   this.userData.nickname = this.userData.name;
      // }
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
      alert("회원가입이 완료되었습니다");
    });
  }

}
