import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { SubcomponentComponent } from './subcomponent/subcomponent.component';
import {HttpClientModule} from '@angular/common/http';
import {FacebookInitService} from './facebook-init.service'
import { ChangeDetectorRef } from '@angular/core/src/change_detection/change_detector_ref';

@NgModule({
  declarations: [
    AppComponent,
    SubcomponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [FacebookInitService],
  bootstrap: [AppComponent]
})
export class AppModule { }
