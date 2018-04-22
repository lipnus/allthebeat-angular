import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'

import { TestPost } from '../model/test-post';
import * as mGlobal from '../global-variables';  //전역변수

@Injectable()
export class PostToServerService {

  constructor( private http: HttpClient) { }


  postServer(path:string, postData:object){
    var URL = mGlobal.ServerPath + path;
    return this.http.post<any>(URL, postData).map(data => { return data });
  }

  // //서버로 좋아요 값 전송
  // postUserLike(sound_pk, heart){
  //   var path = '/user_like';
  //   var auth = JSON.parse(localStorage.getItem('auth'));
  //   var token = auth.token;
  //
  //   var postData = {token:token, sound_pk:sound_pk, heart:heart};
  //   this.postServer(path, postData).subscribe(data => {
  //     return
  //   });
  // }
}
