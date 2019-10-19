import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { CounterComponent } from './components/counter/counter.component';
import { ControlsComponent } from './components/controls/controls.component';
import { RecordsComponent } from './components/records/records.component';

import { RecordsService } from './services/records.service';
import { RunnersService } from './services/runners.service';
import { CountPipe } from './pipes/count.pipe'
@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    ControlsComponent,
    RecordsComponent,
    CountPipe
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [RecordsService, RunnersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
