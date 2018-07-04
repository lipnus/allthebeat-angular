import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Rx";
import { MessageService } from '../../service/message.service';



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  subscription: Subscription;
  menuVisible:boolean = true;


  constructor(
    private messageService: MessageService,) {

  }

  ngOnInit() {
    //상단메뉴가 보일지를 결정
    this.subscription = this.messageService.getMenuState().subscribe(data => {
      this.menuVisible = data.visible;
    });
  }

}
