import * as moment from "moment";
import { AppointmentModel } from "./appointment.model";

export class DayCalendarModel {
    public hourModel: HourModel[];
    public date: Date;
    constructor(dateCurrent: Date, appointments: AppointmentModel[]) {
        this.hourModel = [];
        for (var i = 0; i < 24; i++) {
            this.hourModel.push(new HourModel());
        }

        this.date = dateCurrent;
        this.hourModel.forEach((value, index) => {
            value.hour = index;
        });

        const dayAppointements = appointments.filter(x => new Date(x.date).toDateString() === new Date(this.date).toDateString());
        dayAppointements.forEach((appoint, index) => {
            const hourFound = this.hourModel.find(x => x.hour === new Date(appoint.date)?.getHours());
            if (hourFound) {
                hourFound.minute = new Date(appoint.date).getMinutes();
                hourFound.duration = appoint.durationMinutes;
                const dateMax = moment(this.date).add(appoint.durationMinutes, 'm').toDate();
                hourFound.minutes.filter(x => x.minute >= new Date(appoint.date).getMinutes() && x.minute <= new Date(dateMax).getMinutes())?.forEach((minute, idxMinute) => {
                    minute.description = appoint.description;
                    minute.occupied = true;
                    minute.subject = appoint.subject;
                });
            }
        });
    }
}

export class HourModel {
    public hour: number;
    public minute: number;
    public duration: number;
    public minutes: MinuteModel[];
    constructor() {
        this.hour = 0;
        this.minute = 0;
        this.minutes = [];
        this.duration = 0;
        for (var i = 0; i < 60; i++) {
            this.minutes.push(new MinuteModel());
        }
        this.minutes.forEach((value, index) => {
            value.minute = index;
        });
    }
}

export class MinuteModel {
    minute: number;
    occupied: boolean;
    description: string;
    subject: string;
    constructor() {
        this.minute = 0;
        this.occupied = false;
        this.description = '';
        this.subject = '';
    }
}