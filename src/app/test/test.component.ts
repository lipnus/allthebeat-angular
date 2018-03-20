import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})




export class TestComponent {
  testValue = '테스트';

  testArray : string[];


  constructor(){
    this.testArray = ["하나", "둘", "셋", "넷", "다섯"];
  }

  //시작했을때
  ngOninit(){

  }


}
