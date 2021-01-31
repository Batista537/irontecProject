import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { DisplayBoardComponent } from './components/display-board/display-board.component';
import { HeaderComponent } from './components/header/header.component';


/* MATERIAL INPUTS */
import { MaterialModule } from "./material.module";
import { DialogComponent } from './components/dialog/dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PwaService } from './services/pwa.service';

const initializer = (pwaService: PwaService) => () => pwaService.initPwaPrompt();

@NgModule({
  declarations: [
    AppComponent,
    DisplayBoardComponent,
    HeaderComponent,
    DialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initializer,deps:[ PwaService ], multi: true },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
