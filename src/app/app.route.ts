import { Routes, RouterModule } from '@angular/router';
import {NgModule} from "@angular/core";

// [Component]
import { TestComponent } from './test/test.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { SoundDetailComponent } from './sound-detail/sound-detail.component';
import { MusicplayerComponent } from './musicplayer/musicplayer.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SearchComponent } from './search/search.component';
import { MenuComponent } from './menu/menu.component';



import { JoinComponent } from './join/join.component';
import { ModifyInfoComponent } from './modify-info/modify-info.component';


import { NaverComponent } from './naver/naver.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';


import { AuthGuard } from './guard/index';




const routes: Routes = [

  // { path: 'fuck', component: TestComponent },

  { path: '', component: MainpageComponent },
  { path: 'soundlist', component: MainpageComponent },
  { path: 'sounddetail/:sound_pk', component: SoundDetailComponent },
  { path: 'sounddetail', component: SoundDetailComponent },
  { path: 'musicplayer', component: MusicplayerComponent },
  { path: 'purchase/:sound_pk', component: PurchaseComponent, canActivate: [AuthGuard] },
  { path: 'naver/:state', component: NaverComponent },
  { path: 'naver', component: NaverComponent },
  { path: 'join', component: JoinComponent },
  { path: 'join/:state', component: JoinComponent },
  { path: 'modifyinfo', component: ModifyInfoComponent },

  { path: 'search', component: SearchComponent },
  { path: 'menu', component: MenuComponent },




  { path: 'login', component: LoginComponent },
  // { path: '', component: HomeComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: ''}
];


@NgModule({
  imports: [ RouterModule .forRoot (routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
