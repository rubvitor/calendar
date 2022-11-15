import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import * as moment from 'moment';
import { Moment } from 'moment';
import { AppointmentModel } from 'src/models/appointment.model';
import { DayCalendarModel } from 'src/models/day.calendar-model';
import { CalendarService } from 'src/services/calendar.service';
import { DialogAppointmentComponent } from '../dialog/dialog-appointment.component';
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  @ViewChild('calendar') calendar: MatCalendar<Moment> | undefined;
  selectedDate: Moment;

  dayCalendarModel: DayCalendarModel;
  appointmentSelected: AppointmentModel;

  constructor(private calendarService: CalendarService,
    private dialog: MatDialog) {
    this.dayCalendarModel = new DayCalendarModel(new Date(), calendarService.getAppointments());
    this.selectedDate = moment(new Date());
    this.appointmentSelected = new AppointmentModel(new Date(), 0, '', '');
  }

  ngOnInit(): void {

  }

  initialize(date: Date) {
    this.dayCalendarModel = new DayCalendarModel(date, this.calendarService.getAppointments());
  }

  selectChange(date: Date): void {
    if (!this.appointmentSelected) {
      this.appointmentSelected = new AppointmentModel(new Date(), 0, '', '');
    }

    this.appointmentSelected.date = date;

    const dialogRef = this.dialog.open(DialogAppointmentComponent, {
      width: '250px',
      data: this.appointmentSelected,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.appointmentSelected = result;
      }

      if (this.appointmentSelected.description !== '' && this.appointmentSelected.durationMinutes !== 0 && this.appointmentSelected.subject !== '') {

        const resultNew = this.calendarService.postNewAppointment(new Date(this.appointmentSelected.date.toUTCString()),
          this.appointmentSelected.subject,
          this.appointmentSelected.durationMinutes,
          this.appointmentSelected.description);
        if (!resultNew) {
          alert('Please choose another datetime because its already in use');
        }
      }

      this.initialize(date);
    });
  }

  eventClicked(occupied: boolean, hour: number, duration: number) {
    if (occupied) {
      if (confirm('Do you want to delete this appointment?') === true) {
        const dateParse = new Date(this.selectedDate.toString());
        const dateDelete = new Date(dateParse.getFullYear(), dateParse.getMonth(), dateParse.getDate(), hour);

        this.calendarService.deleteAppointement(dateDelete, duration);
        this.initialize(dateDelete);
      }
    }
  }

  drop(event: CdkDragDrop<any>, occupied: boolean, hour: number, duration: number) {
    debugger;
    if (occupied) {
      debugger;
      const a = event.container.data;
    }
  }

}
