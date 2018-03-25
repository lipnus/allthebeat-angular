import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { PostTestService } from '../service/post-test.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../service/message.service';

// [model]
import { TestPost } from '../model/test-post';
import { SoundData } from '../model/sound-list';
import { SoundListDetail } from '../model/sound-list-detail';

import * as mGlobal from '../global-variables';  //전역변수


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
})




export class MainpageComponent implements OnInit {

  soundData: SoundData;

  globalValue;
  btnClicked:boolean;
  soundCount;



  constructor( private postTestService: PostTestService,
               private http: HttpClient,
               private messageService: MessageService,){
  }

  sendMessage(): void {
        // send message to subscribers via observable subject
        this.messageService.sendMessage('오지고 지리고 렛잇고');
    }

    clearMessage(): void {
        // clear message
        this.messageService.clearMessage();
    }


  ngOnInit(){
    this.globalValue = mGlobal.ServerPath;

    this.soundCount=0;
    this.soundData ={};
    this.postSoundList();
  }

  onClick_test2(){
    console.log("회색클릭");
    this.sendMessage();
  }


  postSoundList(){
    var path = '/sound_list';
    var postData = {user_pk:2};
    this.postTestService.postServer(path, postData).subscribe(data => {
      this.soundData = data;
      console.log( this.soundData );

      this.soundCount = this.soundData.sound_list.length +
                        this.soundData.sound_recommend_list.length
    });
  }




}
