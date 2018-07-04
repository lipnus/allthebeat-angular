import { Routes, RouterModule } from '@angular/router';
import {NgModule} from "@angular/core";

// [Component]
import { MainpageComponent } from './component/mainpage/mainpage.component';
import { SoundDetailComponent } from './component/sound-detail/sound-detail.component';
import { MusicplayerComponent } from './component/musicplayer/musicplayer.component';
import { PurchaseComponent } from './component/purchase/purchase.component';
import { SearchComponent } from './component/search/search.component';
import { MenuComponent } from './component/menu/menu.component';

import { JoinComponent } from './component/join/join.component';
import { JoinSelfComponent } from './component/join-self/join-self.component';

import { ModifyInfoComponent } from './component/modify-info/modify-info.component';
import { RecommendComponent } from './component/recommend/recommend.component';
import { UploadComponent } from './component/upload/upload.component';



import { NaverComponent } from './component/naver/naver.component';
import { LoginComponent } from './component/login/login.component';


import { AuthGuard } from './guard/index';




const routes: Routes = [

  { path: '', component: MainpageComponent },
  { path: 'soundlist', component: MainpageComponent },
  { path: 'sounddetail/:sound_pk', component: SoundDetailComponent },
  { path: 'sounddetail', component: SoundDetailComponent },
  { path: 'musicplayer', component: MusicplayerComponent },
  { path: 'purchase/:sound_pk', component: PurchaseComponent, canActivate: [AuthGuard] },
  { path: 'naver/:state', component: NaverComponent },
  { path: 'naver', component: NaverComponent },
  { path: 'join', component: JoinComponent },
  { path: 'join-self', component: JoinSelfComponent },
  { path: 'join/:state', component: JoinComponent },
  { path: 'modifyinfo', component: ModifyInfoComponent },
  { path: 'recommend', component: RecommendComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] },

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
