import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class IpService {

    constructor(
        private _http: HttpClient
    ) { }

    public getIpv4(): Observable<string> {
        return this._http.jsonp<{ ip: string }>('https://api.ipify.org/?format=jsonp', "callback")
            .pipe(
                map(result => result.ip)
            );
    }

    public getIpv6(): Observable<string> {
        return this._http.jsonp<{ ip: string }>('https://api64.ipify.org/?format=jsonp', "callback")
            .pipe(
                map(result => result.ip)
            );
    }
}