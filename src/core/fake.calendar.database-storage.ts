import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { AppointmentModel } from 'src/models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class StorageCalendarDatabase {

  constructor() { }

  getAppointments(): AppointmentModel[] {
    const calendar = localStorage.getItem('calendar');
    if (calendar && calendar !== '') {
      let appointments = JSON.parse(localStorage.getItem('calendar') as string) as AppointmentModel[];
      appointments = appointments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      return appointments;
    }

    return [];
  }

  verifyAvailability(date: Date, duration: number) {
    const appointements = this.getAppointments();
    const existAppoitment = appointements.filter(x => this.checkConflict(date, duration, x.date));

    return !existAppoitment || existAppoitment.length === 0;
  }

  checkConflict(newDate: Date, newDuration: number, date: Date): boolean {
    const maxNewDate = moment(newDate).add(newDuration, 'm').toDate();
    const dateMax = moment(date).add(newDuration, 'm').toDate();

    if (dateMax && newDate > dateMax) {
        return true;
    }

    if (newDate >= date && (dateMax && maxNewDate <= dateMax)) {
        return false;
    }

    return newDate < date && maxNewDate < date;
}

  addAppointment(date: Date, duration: number, description: string, subject: string): boolean {
    if (this.verifyAvailability(date, duration)) {
      const appointements = this.getAppointments();
      appointements.push({
        date: date,
        endDate: moment(date).add(duration, 'm').toDate(),
        description: description,
        subject: subject,
        durationMinutes: duration
      });

      localStorage.setItem('calendar', JSON.stringify(appointements));

      return true;
    }

    return false;
  }

  getAppointmentsByDate(date: Date): AppointmentModel[] {
    const appointements = this.getAppointments();
    return appointements.filter(x => new Date(x.date).toDateString() === new Date(date).toDateString());
  }

  deleteAppointment(date: Date, duration: number): boolean {
    let appointements = this.getAppointments();
    if (appointements && appointements.length > 0) {
      const appointmentsExistent = appointements.filter(x => new Date(x.date).toString() === date.toString() && duration === duration);
      if (appointmentsExistent && appointmentsExistent.length > 0) {
        const appointmentExistent = appointmentsExistent[0];
        const index = appointements.indexOf(appointmentExistent, 0);
        if (index >= 0) {
          appointements.splice(index);
          localStorage.setItem('calendar', JSON.stringify(appointements));

          return true;
        }
      }
    }

    return false;
  }
}