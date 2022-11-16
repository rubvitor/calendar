import * as moment from "moment";

export class AppointmentModel {
    date: Date;
    endDate: Date;
    durationMinutes: number;
    subject: string;
    description: string;

    constructor(newDate: Date, newDuration: number, newSubject: string, newDescription: string) {
        this.date = newDate;
        this.endDate = moment(newDate).add(newDuration, 'm').toDate();
        this.durationMinutes = newDuration;
        this.subject = newSubject;
        this.description = newDescription;
    }
}