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
import { PostTestService } from './service/post-test.service';
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
    PostTestService,
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
