import { Routes, RouterModule } from '@angular/router';
import {NgModule} from "@angular/core";

// [Component]
import { TestComponent } from './test/test.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { SoundDetailComponent } from './sound-detail/sound-detail.component';
import { MusicplayerComponent } from './musicplayer/musicplayer.component';
import { PurchaseComponent } from './purchase/purchase.component';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './guard/index';




const routes: Routes = [

  { path: '', component: MainpageComponent },
  { path: 'fuck', component: TestComponent },
  { path: 'sounddetail/:sound_pk', component: SoundDetailComponent },
  { path: 'sounddetail', component: SoundDetailComponent },
  { path: 'musicplayer', component: MusicplayerComponent },
  { path: 'purchase/:sound_pk', component: PurchaseComponent },

  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },


  { path: '**', redirectTo: ''}
];


@NgModule({
  imports: [ RouterModule .forRoot (routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
