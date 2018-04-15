import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { PostTestService } from '../service/post-test.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../service/message.service';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import * as mGlobal from '../global-variables';  //전역변수

//[model]
import { Purchase } from '../model';
import { SoundDetail } from '../model';
import { UserData } from '../model';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  textValue;

  termChecked; //약관동의여부
  res_name;

  sound_pk;
  btn_str;

  //객체
  purchase: Purchase;
  soundDetail: SoundDetail;
  userData: UserData;

  constructor( private postTestService: PostTestService,
    private http: HttpClient,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
    this.termChecked = false;
    this.btn_str = "SEND";
    this.purchase = new Purchase();

    window.scrollTo(0, 0); //끌올

    //주소뒤에 붙은 숫자 가져오기
    this.sound_pk = this.route.snapshot.paramMap.get('sound_pk');
    this.postSoundDetail( this.sound_pk );

    //개인정보 가져오기
    var auth = JSON.parse(localStorage.getItem('auth'));
    this.postUser(auth.token);
  }

  postSoundDetail(pk:number){
    var path = '/sound_detail';
    var postData = {user_pk:2, sound_pk: pk};
    this.postTestService.postServer(path, postData).subscribe(data => {
      this.soundDetail = data;
    });
  }

  checkFunction(){
    if(this.termChecked){
      this.termChecked=false;
    }else{
      this.termChecked=true;
    }
  }


  sendOrder(){
    console.log("sendOrder:"+ this.purchase.name);

    if(this.btn_str=="LOADING..."){
      console.log("기둘려주시오");
    }
    else if(this.termChecked==false){
      alert("절차에 동의하셔야 구매의뢰가 가능합니다");
    }else if(this.purchase.name==""){
      alert("이름을 입력해주세요");
    }else if(this.purchase.contact==""){
      alert("연락처를 입력해주세요");
    }else if(this.purchase.price==""){
      alert("구매희망가를 입력해주세요");
    }else{
      this.btn_str = "LOADING...";
      this.postPurchase();
    }
  }


  postPurchase(){
    var path = '/purchase';
    var postData =
    {
      address: "",
      name: this.purchase.name,
      contact: this.purchase.contact,
      worklink: this.purchase.worklink,
      price: this.purchase.price,
      add_info: this.purchase.add_info,
      beat_name: this.soundDetail.sound_name,
      beat_maker: this.soundDetail.beatmaker_nickname };

    this.postTestService.postServer(path, postData).subscribe(data => {
      alert("구매의뢰가 접수되었습니다.");
      this.router.navigate(['/sounddetail/'+this.sound_pk]);
    });
  }

  postUser(token){

    var path = '/user';
    var postData = {token: token};
    this.postTestService.postServer(path, postData).subscribe(data => {
      this.userData = data;

      this.purchase.name = this.userData.name;
      this.purchase.contact = this.userData.mobile;
      this.purchase.worklink = this.userData.sns;


    });
  }

}
