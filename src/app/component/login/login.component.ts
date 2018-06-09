import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../service/index';
import * as mGlobal from '../../global-variables';  //전역변수

// declare const FB:any;
// declare var naver: any;

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css'],

})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    isLogin:boolean;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) {

          // //페이스북 초기화
          // FB.init({
          //   appId      : '2016935185296597',
          //   cookie     : true,
          //   xfbml      : true,
          //   version    : 'v2.12'
          // });



        }

    ngOnInit() {
      // reset login status(이 페이지에 오면 자동으로 로그아웃 처리)
      this.authenticationService.logout();

      if (localStorage.getItem('auth')) {
        this.isLogin = true;
      }else{
        this.isLogin = false;
      }

      // //페이스북
      // FB.getLoginStatus(response => {
      //     this.statusChangeCallback(response);
      // });

      // var naver_id_login = new naver_id_login("0Pechfht9BVKa7WombfB", "http://localhost:9000/auth_naver");
    	// var state = naver_id_login.getUniqState();
    	// naver_id_login.setButton("white", 2,40);
    	// naver_id_login.setDomain("http://localhost:4200");
    	// naver_id_login.setState(state);
    	// naver_id_login.setPopup();
    	// naver_id_login.init_naver_id_login();
      //
      // // //네이버로그인
      // var naverLogin = new naver.LoginWithNaverId({
      //     clientId: "0Pechfht9BVKa7WombfB",
      //     callbackUrl: "http://localhost:4200/join",
      //     isPopup: false, /* 팝업을 통한 연동처리 여부 */
      //     loginButton: {color: "green", type: 3, height: 60} /* 로그인 버튼의 타입을 지정 */
      // });

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




    onClick_naverLogin(){
      // alert("[로그인] 기능입니다");
      var state = Math.floor(Math.random()*10000000);
      location.replace("https://nid.naver.com/oauth2.0/authorize?client_id=0Pechfht9BVKa7WombfB&response_type=code&redirect_uri=" + mGlobal.ServerPath + "/auth_naver&state=" + state);
    }


    onClick_logout(){
      localStorage.removeItem('auth');
      this.router.navigate(['/sound_list']);
    }


    // onClick_localCheck(){
    //   var sss = JSON.parse(localStorage.getItem('naverAuth'));
    //   console.log(sss);
    // }

    //==========================================================================================
    //==========================================================================================
    // //페이스북 로그인 버튼 클릭
    // onFacebookLoginClick() {
    //     console.log("onFacebookLoginClick");
    //     FB.login();
    // }
    //
    // //로그인상태 콜백
    // statusChangeCallback(resp) {
    //     if (resp.status === 'connected') {
    //         // connect here with your server for facebook login by passing access token given by facebook
    //     }else if (resp.status === 'not_authorized') {
    //
    //     }else {
    //
    //     }
    // }
    //==========================================================================================
    //==========================================================================================
}
