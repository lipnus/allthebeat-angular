import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

import { Subscription } from "rxjs/Rx";
import { MessageService } from '../service/message.service';
import * as mGlobal from '../global-variables';  //전역변수


@Component({
  selector: 'app-headmenu',
  templateUrl: './headmenu.component.html',
  styleUrls: ['./headmenu.component.css']
})
export class HeadmenuComponent implements OnInit, OnDestroy {

  test;

  message: any;
  subscription: Subscription;
  isMenuOpen:boolean;

  constructor(private messageService: MessageService,
              private router: Router,
              private location: Location) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  ngOnInit() {
    this.isMenuOpen = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClick_menu(){
    console.log("메뉴");
    if(this.isMenuOpen){
      this.isMenuOpen=false;
      this.location.back();
    }else{
      this.isMenuOpen=true;
      this.router.navigate(['/menu']);
    }
  }


  }


}
