// [Module]
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app.route';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { ClipboardModule } from 'ngx-clipboard';


import { LocationStrategy, HashLocationStrategy } from '@angular/common';

// [Service]
import { PostToServerService } from './service/index';
import { MessageService } from './service/index';
import { ModalService } from './service/index';


// [Component]
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { HeadmenuComponent } from './component/headmenu/headmenu.component';
import { MainpageComponent } from './component/mainpage/mainpage.component';
import { SoundDetailComponent } from './component/sound-detail/sound-detail.component';
import { MusicplayerComponent } from './component/musicplayer/musicplayer.component';
import { PurchaseComponent } from './component/purchase/purchase.component';
import { LoginComponent } from './component/login/login.component';


import { AuthGuard } from './guard/index';
import { AuthenticationService, UserService } from './service/index';
import { JoinComponent } from './component/join/join.component';
import { NaverComponent } from './component/naver/naver.component';
import { SearchComponent } from './component/search/search.component';
import { MenuComponent } from './component/menu/menu.component';
import { ModifyInfoComponent } from './component/modify-info/modify-info.component';
import { RecommendComponent } from './component/recommend/recommend.component';
import { UploadComponent } from './component/upload/upload.component';
import { FooterComponent } from './component/footer/footer.component';

//[directive]
import { ModalComponent } from './directive/index';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    HeadmenuComponent,
    MainpageComponent,
    SoundDetailComponent,
    MusicplayerComponent,
    PurchaseComponent,
    LoginComponent,
    JoinComponent,
    NaverComponent,
    SearchComponent,
    MenuComponent,
    ModifyInfoComponent,
    RecommendComponent,
    UploadComponent,
    FooterComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ClipboardModule,
    // FacebookModule.forRoot(),
    HttpModule,
  ],
  providers: [
    PostToServerService,
    MessageService,
    AuthGuard,
    AuthenticationService,
    UserService,
    ModalService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
