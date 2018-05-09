// [Module]
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app.route';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

// [Service]
import { PostToServerService } from './service/post-to-server.service';
import { MessageService } from './service/message.service';



// [Component]
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { HeadmenuComponent } from './headmenu/headmenu.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { SoundDetailComponent } from './sound-detail/sound-detail.component';
import { MusicplayerComponent } from './musicplayer/musicplayer.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


// used to create fake backend
// import { fakeBackendProvider } from './helper/fake-backend';
// import { MockBackend, MockConnection } from '@angular/http/testing';
// import { BaseRequestOptions } from '@angular/http';


import { AuthGuard } from './guard/index';
import { AuthenticationService, UserService } from './service/index';
import { JoinComponent } from './join/join.component';
import { NaverComponent } from './naver/naver.component';
import { SearchComponent } from './search/search.component';
import { MenuComponent } from './menu/menu.component';
import { ModifyInfoComponent } from './modify-info/modify-info.component';
import { RecommendComponent } from './recommend/recommend.component';
// import { SafePipe } from './safe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    HeadmenuComponent,
    MainpageComponent,
    SoundDetailComponent,
    MusicplayerComponent,
    PurchaseComponent,
    HomeComponent,
    LoginComponent,
    JoinComponent,
    NaverComponent,
    SearchComponent,
    MenuComponent,
    ModifyInfoComponent,
    RecommendComponent,
    // SafePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    // FacebookModule.forRoot(),
    HttpModule,
  ],
  providers: [
    PostToServerService,
    MessageService,
    AuthGuard,
    AuthenticationService,
    UserService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},

    // // providers used to create fake backend
    // fakeBackendProvider,
    // MockBackend,
    // BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
