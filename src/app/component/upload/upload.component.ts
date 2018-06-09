//import component, ElementRef, input and the oninit method from angular core
import { Component, OnInit, ElementRef, Input } from '@angular/core';
//import the file-upload plugin
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
//import the native angular http and respone libraries
import { Http, Response } from '@angular/http';
//import the do function to be used with the http library.
import "rxjs/add/operator/do";
//import the map function to be used with the http library
import "rxjs/add/operator/map";

// const URL = '/api/';
// const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

const URL = 'http://localhost:9000/upload';
// const URL = 'http://allthebeat.com:9000/upload';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  //declare a property called fileuploader and assign it to an instance of a new fileUploader.
  //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the
  //file input when sending the post request.
  public uploaderArtwork:FileUploader = new FileUploader({url: URL, itemAlias: 'artwork'});

  public uploaderBeat:FileUploader = new FileUploader({url: URL, itemAlias: 'beat'});



  title = '업로드';

  ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with credentials.
    this.uploaderArtwork.onAfterAddingFile = (file)=> {
      console.log("onAfterAddingFile");
      file.withCredentials = false;
    };

    this.uploaderBeat.onAfterAddingFile = (file)=> {
      console.log("onAfterAddingFile");
      file.withCredentials = false;
    };


    //아트워크 업로드 완료 콜백
    this.uploaderArtwork.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
        // console.log("ImageUpload:uploaded:", item, status, response);
        // console.log("item: :", item);
        // console.log("status: :", status);
        console.log("[artwork]response: ", response);
        // console.log("headers ", headers);
    };

    //비트 업로드 완료 콜백
    this.uploaderBeat.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
        // console.log("ImageUpload:uploaded:", item, status, response);
        // console.log("item: :", item);
        // console.log("status: :", status);
        console.log("[beat]response: ", response);
        // console.log("headers ", headers);
    };
  }

  //declare a constroctur, so we can pass in some properties to the class, which can be accessed using the this variable
  constructor(private http: Http) {

  }

  clearQueue(){
    this.uploaderArtwork.clearQueue();
    this.uploaderBeat.clearQueue();

  }

  upload(){
    this.uploaderArtwork.uploadAll();
    this.uploaderBeat.uploadAll();

    // this.clearQueue();
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

}
