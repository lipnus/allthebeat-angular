import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { Router } from '@angular/router';


// const URL = 'http://localhost:9000/upload';
// const URL = 'http://allthebeat.com:9000/upload';
// const URL = mGlobal.ServerPath + '/upload';

//[Service]
import { PostToServerService } from '../../service/post-to-server.service';

//[model]
import {GenreList, MoodList, SoundUpload} from "../../model/index";

import * as mGlobal from '../../global-variables';  //전역변수



@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {


  //파일업로드에 필요한 것
  public uploaderArtwork:FileUploader =
  new FileUploader({url: mGlobal.ServerPath +'/upload/artwork', itemAlias: 'artwork'});

  public uploaderMp3:FileUploader =
  new FileUploader({url: mGlobal.ServerPath+'/upload/mp3', itemAlias: 'beat-mp3'});

  public uploaderWav:FileUploader =
  new FileUploader({url: mGlobal.ServerPath+'/upload/wav', itemAlias: 'beat-wav'});

  public uploaderTrack:FileUploader =
  new FileUploader({url: mGlobal.ServerPath+'/upload/track', itemAlias: 'beat-track'});

  licenseOption:string;
  soundUpload:SoundUpload;

  artworkUpload:boolean = false;
  mp3Uploaded:boolean = false;
  wavUploaded:boolean = false;
  trackUploaded:boolean = false;



  ngOnInit() {

    //업로드에 사용될 객체
    this.soundUpload = new SoundUpload();

    //파일 추가 후 콜백
    this.addFile();

    //업로드 후의 콜백
    this.uploadCallback();
  }


  constructor(private http: Http,
              private postToServerService:PostToServerService,
              private router: Router,) {}


  //파일 큐에 올린 후 콜백
  addFile(){
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with credentials.

    this.uploaderArtwork.onAfterAddingFile = (file)=> {
      console.log("onAfterAddingFile-Artwork(img)");
      this.artworkUpload = true;
      file.withCredentials = false;
    };

    this.uploaderMp3.onAfterAddingFile = (file)=> {
      console.log("onAfterAddingFile-Mp3");
      this.mp3Uploaded = true;
      file.withCredentials = false;
    };

    this.uploaderWav.onAfterAddingFile = (file)=> {
      console.log("onAfterAddingFile-Wav");
      this.wavUploaded = true;
      file.withCredentials = false;
    };

    this.uploaderTrack.onAfterAddingFile = (file)=> {
      console.log("onAfterAddingFileTrack(zip)");
      this.trackUploaded = true;
      file.withCredentials = false;
    };


  }

  //업로드가 완료된 후의 콜백
  uploadCallback(){

    //아트워크 업로드 완료 콜백
    this.uploaderArtwork.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      let data = JSON.parse(response);
      this.soundUpload.img_path = data.img_path;
      console.log(this.soundUpload.img_path);
      this.uploaderMp3.uploadAll();
    };

    //mp3 업로드 완료 콜백
    this.uploaderMp3.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      let data = JSON.parse(response);
      this.soundUpload.sound_path = data.sound_path;
      console.log(this.soundUpload.sound_path);

      if(this.soundUpload.license > 0){
        this.uploaderWav.uploadAll();
      }else if(this.soundUpload.license == 0){
        this.postSoundUpload(); //db입력
      }

    };

    //wav 업로드 완료 콜백
    this.uploaderWav.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      let data = JSON.parse(response);
      this.soundUpload.sound_path2 = data.sound_path2;
      console.log(this.soundUpload.sound_path2);

      if(this.soundUpload.license > 1){
        this.uploaderWav.uploadAll();
      }else if(this.soundUpload.license == 1){
        this.postSoundUpload(); //db입력
      }
    };

    //track 업로드 완료 콜백
    this.uploaderTrack.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      let data = JSON.parse(response);
      this.soundUpload.sound_path3 = data.sound_path3;
      console.log(this.soundUpload.sound_path3);

      this.postSoundUpload(); //db입력
    };
  }

  //모든 큐를 비운다
  clearQueue(){
    this.uploaderArtwork.clearQueue();
    this.uploaderMp3.clearQueue();
    this.uploaderWav.clearQueue();
    this.uploaderTrack.clearQueue();
  }

  upload(){
    this.uploaderArtwork.uploadAll();
    this.uploaderMp3.uploadAll();
    this.uploaderWav.uploadAll();
    this.uploaderTrack.uploadAll();
  }



  //서버로 음원정보 전송
  postSoundUpload(){

    this.soundUpload.user_pk = 67;

    let path = '/upload/dbdata';
    let postData = {data: this.soundUpload};
    this.postToServerService.postServer(path, postData).subscribe(data => {

      //post콜백
      console.log("서버로부터 받은값: " , data);

      alert("업로드 완료!");
      this.router.navigate(['/mainpage']);
    });



  }



  handleUploadFileChanged(event) {

        console.log(event);

       // this.uploader.clearQueue();
       let files:File[] = event.target.files;
       let filteredFiles:File[] = [];
       for (var f of files) {
           if (f.name.endsWith(".jpg") || f.name.endsWith(".png") || f.name.endsWith(".jpeg") || f.name.endsWith(".mp3") || f.name.endsWith(".wav") || f.name.endsWith(".zip")) {
               filteredFiles.push(f);
               console.log("PUSH");
           }
       }

       if (filteredFiles.length == 0) {
           // this.showGuide = true;
       } else {
           // this.showGuide = false;
           let options = null;
           let filters = null;

           if(f.name.endsWith(".jpg") || f.name.endsWith(".png") || f.name.endsWith(".jpeg")){
             this.uploaderArtwork.clearQueue();
             this.uploaderArtwork.addToQueue(filteredFiles, options, filters);
           }
           else if(f.name.endsWith(".mp3")){
             this.uploaderMp3.clearQueue();
             this.uploaderMp3.addToQueue(filteredFiles, options, filters);
             console.log("mp3들어감");
           }
           else if(f.name.endsWith(".wav")){
             this.uploaderWav.clearQueue();
             this.uploaderWav.addToQueue(filteredFiles, options, filters);
           }
           else if(f.name.endsWith(".zip")){
             this.uploaderTrack.clearQueue();
             this.uploaderTrack.addToQueue(filteredFiles, options, filters);
           }
       }
   }

   //업로드버튼 클릭
  public onClick_upload():void{

    // this.postSoundUpload();

    if(this.soundUpload.sound_name == undefined){
      alert("title을 입력해주세요");
    }else if(this.soundUpload.bpm == undefined){
      alert("bpm을 입력해주세요")
    }else if(this.soundUpload.license == undefined){
      alert("license를 입력해주세요");
    }else if(this.soundUpload.genre1 == undefined){
      alert("genre1을 입력해주세요");
    }else if(this.soundUpload.genre2 == undefined){
      alert("genre2을 입력해주세요");
    }else if(this.soundUpload.mood1 == undefined){
      alert("mood1을 입력해주세요");
    }else if(this.soundUpload.mood2 == undefined){
      alert("mood2을 입력해주세요");
    }else if(this.soundUpload.mood3 == undefined){
      alert("mood3을 입력해주세요");
    }
    else if(!this.artworkUpload){
      alert("artwork 이미지를 업로드해주세요");
    }else if(!this.mp3Uploaded){
      alert("mp3음원을 업로드해주세요");
    }else if(!this.wavUploaded && this.soundUpload.license == 1){
      alert("wav음원을 업로드해주새요");
    }else if(!this.trackUploaded && this.soundUpload.license == 2 ){
      alert("track파일(zip)을 업로드헤주세요");
    }
    else{

      this.uploaderArtwork.uploadAll();
      // this.postSoundUpload();
    }
  }



  //bpm숫자 범위체크
  bpmCheck(){
    if(this.soundUpload.bpm < 0){
      this.soundUpload.bpm = 0;
    }else if(this.soundUpload.bpm>999){
      this.soundUpload.bpm = 10;
    }
  }

  //라이센스 설정
  onChange_license(){

    //나중에 구조 수정..
    if(this.licenseOption=='lease(mp3)'){
      this.soundUpload.license=0;
    }else if(this.licenseOption=='lease(mp3+wav)'){
      this.soundUpload.license=1;
    }else if(this.licenseOption=='lease(mp3+wav) + exclusive(wav track)'){
      this.soundUpload.license=2;
    }
  }

}
