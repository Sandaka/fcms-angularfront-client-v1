import { Schedule } from './schedule';

export class ScheduleDetails{
    memberregid: number; // should be member reg id
    period: string;
    schedulenumber: number;
    fromdate: string;
    todate: string;
    weight: string;
    lastEdit: string;
    schedule: Schedule[];
}