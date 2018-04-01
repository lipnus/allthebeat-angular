import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  textValue;

  termChecked; //약관동의여부

  constructor() { }

  ngOnInit() {
    this.termChecked = false;
  }

  checkFunction(){
    console.log("???");
    if(this.termChecked){
      this.termChecked=false;
    }else{
      this.termChecked=true;
    }
  }

}
