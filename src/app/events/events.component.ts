import { Component } from '@angular/core';
import { LocalStorageService } from '../services/localstorage.service';
import { AppEvent } from '../models/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})

export class EventsComponent {

    public events: Array<AppEvent> = [];

    constructor(
        private localStorageService: LocalStorageService,
        private router: Router
    ) { }

    ngOnInit() { 
        this.getEvents();
    }

    getEvents = () => {
        this.events = this.localStorageService.getValue("events") || [];
    }

    addEvent = () => {
        this.router.navigate(['/events/add']);
    }

    removeEvent = (index) => {
        this.events = this.localStorageService.remove(index, 'events');
    }

    editEvent = (index) => {
        this.router.navigate(['/events/add', { index: index}]);
    }

}
