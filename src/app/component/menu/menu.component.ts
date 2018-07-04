import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  isLogin:boolean;

  constructor(
    private router: Router,
    private messageService: MessageService,) { }

  ngOnInit() {

    this.messageService.sendMenuState(false);

    if (localStorage.getItem('auth')){
      this.isLogin=true;
    }else{
      this.isLogin=false;
    }
  }

  ngOnDestroy(){

    //이 화면에서 벗어나면 메뉴들을 다시 살려낸다.
    this.messageService.sendMenuState(true);

  }

  onClick_menu(num){
    if(num==1){
      console.log("이히히");
    }
  }

  onClick_logout(){
    localStorage.removeItem('auth');
    this.router.navigate(['/mainpage']);
  }

}
