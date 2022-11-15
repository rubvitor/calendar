import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './calendar/appointments/appointments.component';

const routes: Routes = [{ path: 'appointements', component: AppointmentsComponent },
                        { path: '**', redirectTo: 'appointements' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
