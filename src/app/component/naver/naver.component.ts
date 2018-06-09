import { Component, OnInit } from '@angular/core';
import { PostToServerService } from '../../service/post-to-server.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import * as mGlobal from '../../global-variables';  //전역변수


@Component({
  selector: 'app-naver',
  templateUrl: './naver.component.html',
  styleUrls: ['./naver.component.css']
})
export class NaverComponent implements OnInit {


  constructor(private postTestService: PostToServerService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {

    var state = this.route.snapshot.paramMap.get('state');
    console.log(state);
    this.postToken(state);
  }


  postToken(state){
    var path = '/auth_naver/token_please';
    var postData = {state: state};
    this.postTestService.postServer(path, postData).subscribe(data => {


      console.log("받은토큰: "+ data.token);
      localStorage.setItem('auth', JSON.stringify({ token: data.token }));


      var aaa = JSON.parse(localStorage.getItem('auth'));
      console.log("저장된토큰: " + aaa.token);

      this.router.navigate(['/soundlist']);
    });
  }

}
