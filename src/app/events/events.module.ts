import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { EventsRoutingModule } from './events.routing';
import { EventsComponent } from './events.component';
import { AddEventsComponent } from './add/add.component';
import { EventService } from './services/event.service';

@NgModule({
  declarations: [
    EventsComponent,
    AddEventsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    BsDatepickerModule,
    TimepickerModule,
    ReactiveFormsModule,
    EventsRoutingModule
  ],
  providers: [EventService]
})
export class EventsModule { }
