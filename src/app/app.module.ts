import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// [Component]
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [TestComponent]
})
export class AppModule { }
