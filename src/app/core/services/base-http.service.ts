import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({ providedIn: 'root'})
export class BaseHttpService {
    private http = inject(HttpClient);
    private baseUrl = 'https://fakestoreapi.com';

    get<T>(endpoint:string): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}/${endpoint}`).pipe(catchError(this.handleError));
    }

    getById<T>(endpoint:string, id:number):Observable<T>{
        return this.http.get<T>(`${this.baseUrl}/${endpoint}/${id}`).pipe(catchError(this.handleError));
    }

    post<T>(endpoint:string,data:T):Observable<T>{
        return this.http.post<T>(`${this.baseUrl}/${endpoint}`,data).pipe(catchError(this.handleError));
    }

    put<T>(endpoint:string,id:number,data:T):Observable<T>{
        return this.http.put<T>(`${this.baseUrl}/${endpoint}/${id}`,data).pipe(catchError(this.handleError))
    }

    delete<T>(endpoint:string, id:number):Observable<T>{
        return this.http.delete<T>(`${this.baseUrl}/${endpoint}/${id}`).pipe(catchError(this.handleError))
    }

    private handleError(error: HttpErrorResponse){
        console.error('HTTP Error:', error);
        return throwError(() => new Error('An error occurred while processing your request.'));
    }
}