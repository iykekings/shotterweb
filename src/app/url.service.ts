import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import Url from 'src/interfaces/Url';

interface DecodedToken {
    Id: string;
    sub: string;
    iat: number;
    exp: number;
}
@Injectable({
    providedIn: 'root',
})
export class UrlService {
    baseUrl = environment.baseUrl + '/urls';
    decoded: DecodedToken;
    headers: HttpHeaders;
    token: string;

    constructor(private http: HttpClient) {
        this.token = localStorage.getItem('token');
        this.decoded = new JwtHelperService().decodeToken(this.token);
        this.headers = new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
        });
    }

    fetchAllUrlByUser() {
        return this.http.get<Url[]>(
            `${this.baseUrl}/${this.decoded.Id}/owner`,
            {
                headers: this.headers,
            }
        );
    }

    createUrl(directory: string, redirect: string) {
        return this.http.post<Url>(
            this.baseUrl,
            { redirect, directory, owner: { ownerid: this.decoded.Id } },
            { headers: this.headers }
        );
    }
}
