import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { PostToServerService } from '../../service/post-to-server.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../../service/message.service';
import {SoundData} from '../../model/sound-list';
import * as mGlobal from '../../global-variables';

@Component({
  selector: 'app-mybeat',
  templateUrl: './mybeat.component.html',
  styleUrls: ['./mybeat.component.css']
})
export class MybeatComponent implements OnInit {

  soundData: SoundData;
  soundCount: number;


  constructor( private postTestService: PostToServerService,
               private http: HttpClient,
               private messageService: MessageService,
               private router: Router,){
  }

  ngOnInit() {
    let auth = JSON.parse(localStorage.getItem('auth'));
    let token = auth.token;
    this.soundCount=-1;
    this.postMybeat(token);
  }

  postMybeat(token:string){
    let path = '/mybeat';
    token = token;
    let postData = {token:token};

    this.postTestService.postServer(path, postData).subscribe(data => {
      this.soundData = data;
      this.applyArtworkPath(); //이미지경로에 서버위치 붙여주기

      //전체 음원개수
      this.soundCount = this.soundData.sound_list.length;
    });
  }

  //이미지 경로를 완성시켜줌
  applyArtworkPath(){

    for(var i=0; i<this.soundData.sound_list.length; i++){
      this.soundData.sound_list[i].img_path
        = mGlobal.ArtworkPath + "/" + this.soundData.sound_list[i].img_path;
    }
  }


}
