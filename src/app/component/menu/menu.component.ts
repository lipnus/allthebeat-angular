import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogin:boolean;

  constructor(private router: Router,) { }

  ngOnInit() {

    // //임시로그인
    // localStorage.setItem('auth', JSON.stringify({ token: "AAAAOJz0gx1aGEIVt9DURi2/izpu7JZaNr8qTbtHSPoPHJos5GLdEcobR0Hkcv1Foquf6fweEvBfyHvsLiG+IdvtlZY=" }));

    if (localStorage.getItem('auth')){
      this.isLogin=true;
    }else{
      this.isLogin=false;
    }
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
