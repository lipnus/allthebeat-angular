import { Component, OnInit } from '@angular/core';
import { PostToServerService } from '../../service/post-to-server.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import * as mGlobal from '../../global-variables';  //전역변수


/*
네이버를 이용한 가입과 동일하게 처리하기 위해서 여기서는 이메일과 비밀번호만 받아서
 구별만 하고 이후 자세한 정보를 입력하는 과정은 join에서 처리
*/

@Component({
  selector: 'app-join-self',
  templateUrl: './join-self.component.html',
  styleUrls: ['./join-self.component.css']
})
export class JoinSelfComponent implements OnInit {

  email:string ="";
  password:string="";
  passwordConfirm:string="";

  noticeStr1:string;
  noticeStr2:string;


  constructor(private postToServerService: PostToServerService,
              private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit() {

  }

  onClick_join(){
    this.joinCheck();
  }

  passCheck(){
    if(this.password.length < 8){
      this.noticeStr2 = "8자리 이상의 비밀번호를 입력해주세요";
    }else if (this.password != this.passwordConfirm) {
      this.noticeStr2 = "비밀번호가 일치하지 않습니다";
    }else{
      this.noticeStr2 = "";
    }
  }

  emailCheck(){
    let email = new String(this.email);
    if(email.indexOf("@") == -1){
      this.noticeStr1 = "이메일 형식이 올바르지 않습니다";
    }else if(email.indexOf(".") == -1){
      this.noticeStr1 = "이메일 형식이 올바르지 않습니다";
    }else{
      this.noticeStr1 = "";
    }
  }

  //회원가입 양식을 체크한다
  joinCheck(){

    let email = new String(this.email);

    if (this.email == "") {
      alert("이메일을 입력헤주세요");
    }else if(email.indexOf("@") == -1){
      alert("이메일 형식이 올바르지 않습니다");
    } else if (this.password == "") {
      alert("비밀번호를 입력해주세요");
    } else if (this.password != this.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다");
    }else {
      console.log("가입완료우!");
      this.postJoin();
    }
  }

  //서버로 가입정보와 state를 전송(state는 필요없지만 naver와의 구조일치 때문에)
  postJoin(){
    let state = Math.floor(Math.random() * 10000000);
    let path = '/join_self';
    let postData = {
      email: this.email,
      password: this.password,
      state:state
    };

    this.postToServerService.postServer(path, postData).subscribe(data => {

      console.log("결과: ", data);

      if (data.result == "ok") {
        localStorage.setItem('auth', JSON.stringify({ token: data.token }));
        this.router.navigate(['/join/' + data.state ]);

      }else if(data.result=="overlap") {
        alert("이미 존재하는 이메일입니다");
        this.noticeStr1 = "이미 존재하는 이메일입니다";
      }else{
        alert("데이터 전송에 실패했습니다. 다시 시도해주세요.");
      }
    });
  }

}
