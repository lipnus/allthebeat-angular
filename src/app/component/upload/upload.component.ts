import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

// const URL = '/api/';
// const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

// const URL = 'http://localhost:9000/upload';
const URL = 'http://localhost:9000/upload/fuck';
// const URL = 'http://allthebeat.com:9000/upload';

//[Service]
import { PostToServerService } from '../../service/post-to-server.service';

//[model]
import {GenreList, MoodList, SoundUpload} from "../../model/index";



@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {


  public uploaderArtwork:FileUploader = new FileUploader({url: URL, itemAlias: 'artwork'});
  public uploaderBeat:FileUploader = new FileUploader({url: URL, itemAlias: 'beat'});

  genreList:GenreList;
  moodList:MoodList;
  soundUpload:SoundUpload;

  test:string = 'ttt';

  ngOnInit() {
    this.genreList = new GenreList();
    this.moodList = new MoodList();
    this.soundUpload = new SoundUpload();

    console.log("들어가있나: " + this.genreList.genre[0] + " / " + this.moodList.mood[5]);


    //파일 큐에 올린 후 콜백
    this.addFile();

    //업로드 후의 콜백
    this.uploadCallback();
  }


  constructor(private http: Http,
              private postToServerService:PostToServerService, ) {}


  //파일 큐에 올린 후 콜백
  addFile(){
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with credentials.
    this.uploaderArtwork.onAfterAddingFile = (file)=> {
      console.log("onAfterAddingFile");
      file.withCredentials = false;
    };

    this.uploaderBeat.onAfterAddingFile = (file)=> {
      console.log("onAfterAddingFile");
      file.withCredentials = false;
    };
  }

  //업로드가 완료된 후의 콜백
  uploadCallback(){

    //아트워크 업로드 완료 콜백
    this.uploaderArtwork.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      // console.log("ImageUpload:uploaded:", item, status, response);
      // console.log("item: :", item);
      // console.log("status: :", status);
      console.log("[artwork]response: ", response);
      this.clearQueue();
      // console.log("headers ", headers);
    };

    //비트 업로드 완료 콜백
    this.uploaderBeat.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("[beat]response: ", response);
      this.clearQueue();
    };
  }

  clearQueue(){
    this.uploaderArtwork.clearQueue();
    this.uploaderBeat.clearQueue();

  }

  //업로드실시
  upload(){
    this.uploaderArtwork.uploadAll();
    this.uploaderBeat.uploadAll();
    // this.clearQueue();
  }


  //서버로 음원정보 전송
  postSoundUpload(){

    var path = '/sound_list';

    let postData = this.soundUpload;
    this.postToServerService.postServer(path, postData).subscribe(data => {
      //post콜백
    });

  }


  handleUploadFileChanged(event) {

       // this.uploader.clearQueue();
       let files:File[] = event.target.files;
       let filteredFiles:File[] = [];
       for (var f of files) {
           if (f.name.endsWith(".jpg") || f.name.endsWith(".png") || f.name.endsWith(".jpeg") || f.name.endsWith(".mp3")) {
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
             this.uploaderArtwork.addToQueue(filteredFiles, options, filters);
           }else if(f.name.endsWith(".mp3")){
             this.uploaderBeat.addToQueue(filteredFiles, options, filters);
           }
       }
   }

   //업로드버튼 클릭
  public onClick_upload():void{


    if(this.soundUpload.sound_name == undefined){
      alert("title을 입력해주세요");
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



  }
}
