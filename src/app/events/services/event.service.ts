import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Injectable()
export class EventService {

    constructor(private httpService: HttpService){}

    public getLocation(loc: string, successCallback, errorCallback) {
        let url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyCMdl2byZOgAEJwJXO3LeTHwHT4JQWQ7Zo&input=${loc}`
        this.httpService.get(url, successCallback, errorCallback);
    }
}