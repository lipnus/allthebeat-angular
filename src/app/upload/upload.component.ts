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

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  //declare a property called fileuploader and assign it to an instance of a new fileUploader.
  //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the
  //file input when sending the post request.
  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  title = '업로드';

  ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with credentials.
    this.uploader.onAfterAddingFile = (file)=> {
      console.log("onAfterAddingFile");
      file.withCredentials = false;
    };


    //overide the onCompleteItem property of the uploader so we are able to deal with the server response.
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
        // console.log("ImageUpload:uploaded:", item, status, response);
        console.log("item: :", item);
        console.log("status: :", status);
        console.log("response: ", response);
        console.log("headers ", headers);

    };
  }

  //declare a constroctur, so we can pass in some properties to the class, which can be accessed using the this variable
  constructor(private http: Http, private el: ElementRef) {

  }

  handleUploadFileChanged(event) {

       this.uploader.clearQueue();
       let files:File[] = event.target.files;
       let filteredFiles:File[] = [];
       for (var f of files) {
           if (f.name.endsWith(".jpg") || f.name.endsWith(".png") || f.name.endsWith(".jpeg")) {
               filteredFiles.push(f);
           }
       }

       if (filteredFiles.length == 0) {
           // this.showGuide = true;
       } else {
           // this.showGuide = false;
           let options = null;
           let filters = null;
           this.uploader.addToQueue(filteredFiles, options, filters);
       }
   }




  //the function which handles the file upload without using a plugin.
  upload() {
  //locate the file element meant for the file upload.
      let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
  //get the total amount of files attached to the file input.
      let fileCount: number = inputEl.files.length;
  //create a new fromdata instance
      let formData = new FormData();
  //check if the filecount is greater than zero, to be sure a file was selected.
      if (fileCount > 0) { // a file was selected
          //append the key name 'photo' with the first file in the element
              formData.append('photo', inputEl.files.item(0));
          //call the angular http method
          this.http
      //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
              .post(URL, formData).map((res:Response) => res.json()).subscribe(
              //map the success function and alert the response
               (success) => {
                       alert(success._body);
              },
              (error) => alert(error))
        }
     }
}
