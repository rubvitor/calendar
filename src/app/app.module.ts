import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from 'src/core/angular.material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentsComponent } from './calendar/appointments/appointments.component';
import { DialogAppointmentComponent } from './calendar/dialog/dialog-appointment.component';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentsComponent,
    DialogAppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularMaterialModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  exports: [AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
