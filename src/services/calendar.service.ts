import { Injectable } from '@angular/core';
import { StorageCalendarDatabase } from 'src/core/fake.calendar.database-storage';
import { AppointmentModel } from 'src/models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private storageCalendarDatabase: StorageCalendarDatabase) { }

  postNewAppointment(date: Date, subject: string, duration: number, description: string) : boolean {
    return this.storageCalendarDatabase.addAppointment(date, duration, description, subject);
  }

  getAppointments() : AppointmentModel[] {
    return this.storageCalendarDatabase.getAppointments();
  }

  deleteAppointement(date: Date, duration: number): boolean {
    return this.storageCalendarDatabase.deleteAppointment(date, duration);
  }

  verifyAvailibility(date: Date, duration: number): boolean {
    return this.storageCalendarDatabase.verifyAvailability(date, duration);
  }
}
