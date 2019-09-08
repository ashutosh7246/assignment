import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/localstorage.service';
import { AppEvent } from '../../models/event.model';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { EventService } from '../services/event.service';
import { fromEvent, Subject } from 'rxjs';
import { switchMap, debounceTime, tap, map } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddEventsComponent {

    public events: Array<AppEvent> = [];
    public searchLocation: any = "";
    customInput : Subject<string> = new Subject();
    public locatons: Array<any> = [];
    public selectedLocation: any = [];
    public locationLoading: any = false;
    public locationDropdownSettings: any = {
      text: "Select Locations",
      classes: "myclass custom-class",
      primaryKey: "alpha3Code",
      labelKey: "name",
      noDataLabel: "Search Locations...",
      enableSearchFilter: true,
      singleSelection: true,
      searchBy: ['name']
    }
    public eventForm: FormGroup;
    public guestForm: FormGroup;
    allowMouseWheel: any = true;

    eventIndex: any = null;

    constructor(
        private localStorageService: LocalStorageService,
        private formBuilder: FormBuilder,
        private eventService: EventService,
        private router: Router,
        private route: ActivatedRoute
    ) {
      this.customInput.pipe(tap(ev => this.locationLoading = true),debounceTime(2000)).subscribe(data => this.getLocation(data));
      this.route.params.subscribe((params: Params) => {
        this.eventIndex = +params['index'];
      });
    }

    ngOnInit() {
      if(this.eventIndex || this.eventIndex === 0){
        let value = this.localStorageService.getValueAt(this.eventIndex, 'events');
        this.bildEventForm(value);
      } else {
        this.bildEventForm();
      }
      this.bildGuestForm();
    }

    getLocation = (loc) => {
      let success = (data) => {
        if(data && data.predictions && data.predictions.length){
          this.locatons = data.predictions;
          if(this.eventForm && this.eventForm.value && this.eventForm.value.location && this.eventForm.value.location.description){
            this.selectedLocation = this.eventForm.value.location.description;
          }
        } else {
          this.locatons = [];
        }
        this.locationLoading = false;
      }
      let failure = (error) => {
        this.locatons = [];
        this.locationLoading = false;
      }
      this.eventService.getLocation(loc,success,failure)
    }

    onLocationSearch = (event?) => {
      this.searchLocation = (event && event.term)?event.term:'';
      this.customInput.next(this.searchLocation);
    }

    onClear = () => {
      this.buildLocationForm(null);
    }

    onAdd = (event) => {
      this.buildLocationForm(event);
    }

    onRemove = (event) => {
      this.buildLocationForm(event);
    }

    onChange = (event) => {
      this.buildLocationForm(event);
    }

    bildEventForm = (data?) => {
        this.eventForm = this.formBuilder.group({
            title: [(data && data.title)?data.title:'', [Validators.required]],
            allDay: [(data && data.allDay)?data.allDay:false, [Validators.required]],
            startTime: [(data && data.startTime)?data.startTime:new Date(), [Validators.required]],
            endTime: [(data && data.endTime)?data.endTime:new Date(), [Validators.required]],
            dateRange: new FormControl([(data && data.dateRange.length && data.dateRange[0])?new Date(data.dateRange[0]):new Date(), (data && data.dateRange.length && data.dateRange[1])?new Date(data.dateRange[1]):new Date()]),
            email: [(data && data.email)?data.email:'', [Validators.required, Validators.email]],
            location: this.formBuilder.group({
              description: [(data && data.location && data.location.description)?data.location.description:'', [Validators.required]],
              id: [(data && data.location && data.location.id)?data.location.id:'', [Validators.required]],
              place_id: [(data && data.location && data.location.place_id)?data.location.place_id:'', [Validators.required]]
            }, [Validators.required]),
            description: [(data && data.description)?data.description:'', [Validators.required]],
            guests: this.formBuilder.array([])
        });

        if (data && data.guests && data.guests.length) {
            for (let i = 0; i < data.guests.length; i++) {
                let gu: any = {
                    email: data.guests[i].email
                }
                this.addGuestFields(i, gu);
            }
        }

        this.customInput.next(this.eventForm.value.location.description);

        this.onChanges();
    }

    public addGuestFields = (index, xField) => {
        let gu: any = xField ? xField : {
            email: ''
        };
        let guests = this.eventForm.get('guests') as FormArray;
        guests.insert(index || guests.length, this.createGuestFields(gu));
    }

    public createGuestFields = (guest?): FormGroup => {
        let form = this.formBuilder.group({
            email: [(guest && guest.email)?guest.email:'', [Validators.required, Validators.email]]
        });
        return form;
    }

    bildGuestForm = () => {
      this.guestForm = this.createGuestFields();
    }

    buildLocationForm = (data?) => {
      let location = this.eventForm.get('location') as FormGroup;
      location.patchValue({
        description: (data && data.description)?data.description:'',
        id: (data && data.id)?data.id:'',
        place_id: (data && data.place_id)?data.place_id:''
      });
    }

    addGuest = () => {
      if(this.guestForm && this.guestForm.valid){
        this.addGuestFields(0, this.guestForm.value);
        this.guestForm.reset();
      }
    }

    removeGuest = (index) => {
      let guests = this.eventForm.get('guests') as FormArray;
      guests.removeAt(index);
    }

    save = () => {
      console.log(this.eventForm);
      if(this.eventForm && this.eventForm.valid){
        if(this.eventIndex || this.eventIndex === 0){
          this.localStorageService.update(this.eventIndex, 'events',this.eventForm.value);
        } else {
          this.localStorageService.add('events',this.eventForm.value);
        }
        this.eventForm.reset();
        this.router.navigate(['/events']);
      } else {
        this.validateAllFormFields(this.eventForm);
      }
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    onChanges(): void {
      this.eventForm.get('allDay').valueChanges.subscribe(val => {
        this.addRemoveBenchmarkValidation(val);
      });
    }

    addRemoveBenchmarkValidation = (flag) => {
        let startTime = this.eventForm.get('startTime') as FormControl;
        if (!flag) {
            startTime.setValidators([Validators.required]);
        } else {
            startTime.clearValidators();
        }
        startTime.updateValueAndValidity();
        let endTime = this.eventForm.get('endTime') as FormControl;
        if (!flag) {
            endTime.setValidators([Validators.required]);
        } else {
            endTime.clearValidators();
        }
        endTime.updateValueAndValidity();
    }

}
