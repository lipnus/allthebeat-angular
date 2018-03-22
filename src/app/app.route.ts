import { Routes, RouterModule } from '@angular/router';
import {NgModule} from "@angular/core";

// [Component]
import { TestComponent } from './test/test.component';


const routes: Routes = [

  { path: '', component: TestComponent },
  { path: 'fuck', component: TestComponent },

];


@NgModule({
  imports: [ RouterModule .forRoot (routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
