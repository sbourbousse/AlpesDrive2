import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user.model";
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of, BehaviorSubject } from "rxjs";
import { Entreprise } from "../models/entreprise.model";
import { PointRelais } from "../models/pointRelais.model";
import { PointRelaisType } from "../models/pointRelaisType.model";

@Injectable({
  providedIn: "root"
})
export class PointRelaisService {
  constructor(private http: HttpClient) {}

  private pointRelaisListUrl: string = "http://sylvain-bourbousse.fr/api/ ";
  private pointRelaisTypeListUrl: string = "http://sylvain-bourbousse.fr/api/ ";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  getPointRelais() {} //TODO
  getPointRelaisType() {
    let pointRelaisTypeList: PointRelaisType[];
    let response = this.http
      .get(this.pointRelaisTypeListUrl)
      .pipe(catchError(this.handleError<User>("signupProducteur")));
    return response;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
