import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {

    constructor(private httpClient: HttpClient){}

    public get = (url: string, successCallback, errorCallback): Observable<any[]> => {
        let observer = this.httpClient.get(url);
        return this.handleRespone(observer, successCallback, errorCallback);
    }

    private handleRespone = <T>(observer, successCallback, errorCallback) => {
        return observer.subscribe(
            (result: Response) => {
                successCallback(result)
            },
            error => {
                errorCallback(error)
            })
    }
}