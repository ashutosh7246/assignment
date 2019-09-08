export class AppEvent {
    title?: string;
    allDay?: boolean;
    startDate?: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    email?: string;
    location?: string;
    description?: string;
    guests?: Array<string>;

    constructor(
        title?: string,
        allDay?: boolean,
        startDate?: string,
        endDate?: string,
        startTime?: string,
        endTime?: string,
        email?: string,
        location?: string,
        description?: string,
        guests?: Array<string>
    ) {
        this.title = title || '';
        this.allDay = allDay || false;
        this.startDate = startDate || '';
        this.endDate = endDate || '';
        this.startTime = startTime || '';
        this.endTime = endTime || '';
        this.email = email || '';
        this.location = location || '';
        this.description = description || '';
        this.guests = guests || [];
    }
}