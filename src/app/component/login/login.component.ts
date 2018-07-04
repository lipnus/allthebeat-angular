import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostToServerService } from '../../service/post-to-server.service';

import { AuthenticationService } from '../../service/index';
import * as mGlobal from '../../global-variables';
import {HttpClient} from '@angular/common/http';  //전역변수




@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css'],

})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';

  isLogin: boolean;

  email: string;
  password: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private postToServerService: PostToServerService,
    private http: HttpClient,) {

  }

  ngOnInit() {
    // reset login status(이 페이지에 오면 자동으로 로그아웃 처리)
    this.authenticationService.logout();

    if (localStorage.getItem('auth')) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }

  }//onInit


  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result === true) {
          // login successful
          this.router.navigate(['/']);
        } else {
          // login failed
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });
  }

  //네이버 창으로 리다이렉트
  onClick_naverLogin() {
    var state = Math.floor(Math.random() * 10000000);
    location.replace("https://nid.naver.com/oauth2.0/authorize?client_id=0Pechfht9BVKa7WombfB&response_type=code&redirect_uri=" + mGlobal.ServerPath + "/auth_naver&state=" + state);
  }

  onClick_logout() {
    localStorage.removeItem('auth');
    this.router.navigate(['/sound_list']);
  }

  //로그인
  onClick_login() {
    if (this.email == null || this.email == "") {
      alert("이메일을 입력헤주세요");
    } else if (this.password == null || this.password == "") {
      alert("비밀번호를 입력해주세요");
    } else {
      this.postLogin(this.email, this.password)
    }
  }

  //서버로 로그인확인처리
  postLogin(email: string, pw: string) {
    let path = '/login_self';
    let postData = {email: email, password: pw};
    this.postToServerService.postServer(path, postData).subscribe(data => {
      console.log("결과: ", data);

      if (data.result == "ok") {

        //받은 토큰을 클라이언트에 저장
        localStorage.setItem('auth', JSON.stringify({ token: data.token }));
        this.router.navigate(['/soundlist']);

      } else {
        alert("아이디나 비밀번호가 올바르지 얺습니다");
      }
    });
  }

  //회원가입
  onClick_join(){
    this.router.navigate(['/join-self']);
  }
}
