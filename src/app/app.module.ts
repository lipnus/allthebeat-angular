// [Module]
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app.route';

// [Service]
import { PostTestService } from './service/post-test.service';
import { MessageService } from './service/message.service';
import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service';


// [Component]
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { HeadmenuComponent } from './headmenu/headmenu.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { SoundDetailComponent } from './sound-detail/sound-detail.component';
import { MusicplayerComponent } from './musicplayer/musicplayer.component';
import { PurchaseComponent } from './purchase/purchase.component';
// import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component'





@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    HeadmenuComponent,
    MainpageComponent,
    SoundDetailComponent,
    MusicplayerComponent,
    PurchaseComponent,
    // LoginComponent,
    SigninComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    PostTestService,
    MessageService,
    AuthService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
