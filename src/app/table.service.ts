import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map} from 'rxjs/operators';
import { Dataset } from './dataset';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) { }

  APIUrl = 'http://34.241.217.201/users_bgp'; // URL to web API de mi backend
  data:Dataset[] = [];

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

    // GET all Datasets
    getAll(): Observable<any> {
      const url = `${this.APIUrl}`;
      return this.http.get<any>(url)
      .pipe(
        map(data => data),
         catchError(this.handleError('getAll', []))
      );
    }
  
    // PUT Edition Row
    putEditionRow(data:any): Observable<any> {
      const url = `${this.APIUrl}/${data.id}`;
      return this.http.put<any>(url, data).pipe(
        catchError(this.handleError<Dataset>(`putEditionRow id=${data.id}`))
        );
    }

     // DELETE Row
     deleteRow(id:number): Observable<any> {
      const url = `${this.APIUrl}/${id}`;
      return this.http.delete<any>(url)
      .pipe(
        map(data => data),
         catchError(this.handleError('deleteRow', []))
      );
    }

     // POST Row
     postNewRow(data:any): Observable<any> {
      const url = `${this.APIUrl}`;
      return this.http.post<any>(url, data).pipe(
        catchError(this.handleError<Dataset>(`postNewRow id=${data.id}`))
        );
    }

}


