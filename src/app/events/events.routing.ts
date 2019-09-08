import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events.component';
import { AddEventsComponent } from './add/add.component';

const routes: Routes = [
    { path: '', component: EventsComponent },
    { path: 'add', component: AddEventsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventsRoutingModule { }
