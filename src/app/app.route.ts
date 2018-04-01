import { Routes, RouterModule } from '@angular/router';
import {NgModule} from "@angular/core";

// [Component]
import { TestComponent } from './test/test.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { SoundDetailComponent } from './sound-detail/sound-detail.component';
import { MusicplayerComponent } from './musicplayer/musicplayer.component';
import { PurchaseComponent } from './purchase/purchase.component';




const routes: Routes = [

  { path: '', component: MainpageComponent },
  { path: 'fuck', component: TestComponent },
  { path: 'sounddetail/:sound_pk', component: SoundDetailComponent },
  { path: 'sounddetail', component: SoundDetailComponent },
  { path: 'musicplayer', component: MusicplayerComponent },
  { path: 'purchase/:sound_pk', component: PurchaseComponent },
  { path: '**', redirectTo: ''}

];


@NgModule({
  imports: [ RouterModule .forRoot (routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
