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
import { NotExpr } from '@angular/compiler';
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  @ViewChild('calendar') calendar: MatCalendar<Moment> | undefined;
  selectedDate: Moment;
  selectedDateFormat: Date;

  dayCalendarModel: DayCalendarModel;
  appointmentSelected: AppointmentModel;
  appointments: AppointmentModel[];

  constructor(private calendarService: CalendarService,
    private dialog: MatDialog) {
    this.appointments = calendarService.getAppointments();
    this.selectedDateFormat = new Date();
    this.dayCalendarModel = new DayCalendarModel(this.selectedDateFormat, this.appointments );
    this.selectedDate = moment(this.selectedDateFormat);
    this.appointmentSelected = new AppointmentModel(this.selectedDateFormat, 0, '', '');
  }

  ngOnInit(): void {

  }

  initialize(date: Date) {
    this.appointments = this.calendarService.getAppointments();
    this.dayCalendarModel = new DayCalendarModel(date, this.appointments);
  }

  selectChange(date: Date): void {
    this.selectedDateFormat = date;
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

  eventClicked(hour: number, minute: number, duration: number) {
    if (this.verifyWithDuration(hour, minute, duration)) {
      if (confirm('Do you want to delete this appointment?') === true) {
        const dateParse = new Date(this.selectedDate.toString());
        const dateDelete = new Date(dateParse.getFullYear(), dateParse.getMonth(), dateParse.getDate(), hour, minute);

        this.calendarService.deleteAppointement(dateDelete, duration);
        this.initialize(dateDelete);
      }
    }
  }

  drop(event: CdkDragDrop<any>, occupied: boolean, hour: number, duration: number) {
    debugger;
    if (occupied) {
      const a = event.container.data;
    }
  }

  verifyWithDuration(hour: number, minute: number, duration: number) {
    debugger;
    const found = this.appointments.find(x => new Date(x.date).getDate() == new Date(this.selectedDateFormat).getDate() &&
      new Date(x.date).getHours() === hour
      && new Date(x.date).getMinutes() === minute
      && x.durationMinutes === duration);

    return found != undefined;
  }

  verifyAppointment(hour: number, minute: number): boolean {
    const found = this.appointments.find(x => new Date(x.date).getDate() === new Date(this.selectedDateFormat).getDate()
      && (hour >= new Date(x.date).getHours() && hour <= new Date(x.endDate).getHours())
      && minute >= new Date(x.date).getMinutes() && minute <= new Date(x.endDate).getMinutes());

    return found != undefined;
  }
}
