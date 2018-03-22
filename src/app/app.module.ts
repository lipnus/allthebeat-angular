// [Module]
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app.route';

// [Component]
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';

// [Service]
import { PostTestService } from './service/post-test.service';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    PostTestService,
  ],
  bootstrap: [TestComponent]
})
export class AppModule { }
