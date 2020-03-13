import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import Owner from 'src/interfaces/Owner';

interface Token {
    token: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    baseUrl = environment.baseUrl + '/owners';

    constructor(private http: HttpClient) {}

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            // this.log(`${operation} failed: ${error.message}`);
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    login(username: string, password: string): Observable<Token> {
        return this.http
            .post<Token>(`${this.baseUrl}/login`, { username, password })
            .pipe(take(1));
    }

    register(owner: Owner): Observable<Owner> {
        console.log(`${this.baseUrl}/create`);
        return this.http
            .post<Owner>(`${this.baseUrl}/create`, owner)
            .pipe(take(1));
    }
}
