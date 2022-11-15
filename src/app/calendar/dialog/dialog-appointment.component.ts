import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentModel } from 'src/models/appointment.model';
import { CalendarService } from 'src/services/calendar.service';
@Component({
  selector: 'app-dialog-appointment',
  templateUrl: './dialog-appointment.component.html',
  styleUrls: ['./dialog-appointment.component.scss']
})
export class DialogAppointmentComponent implements OnInit {

  appointment: AppointmentModel;
  hour: number;
  constructor(private calendarService: CalendarService,
    public dialogRef: MatDialogRef<DialogAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AppointmentModel) {
    this.appointment = data;
    this.appointment.subject = '';
    this.appointment.description = '';
    this.appointment.durationMinutes = 0;
    this.hour = 0;
  }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close(this.appointment);
  }

  confirm() {
    const newDate = new Date(this.appointment.date.getFullYear(), this.appointment.date.getMonth(), this.appointment.date.getDate(), this.hour);
    this.appointment.date = newDate;
    this.close();
  }

  onNoClick() {
    this.close();
  }
}
