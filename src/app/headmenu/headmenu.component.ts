import { Component, OnInit } from '@angular/core';

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

  constructor(private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  ngOnInit() {
    this.test = mGlobal.test;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
