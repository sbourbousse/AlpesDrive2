import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user.model";
import { catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { environment } from '../models/api.model';



@Injectable({
  providedIn: "root"
})
export class PointRelaisService {
  constructor(private http: HttpClient) {}

  private pointRelaisListUrl: string =  environment.apiUrl+"pointRelais_list.php";
  private pointRelaisTypeListUrl: string =  environment.apiUrl+"pointRelaisType_list.php";
  private producteurListUrl: string =  environment.apiUrl+"producteur_list.php";


  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  /**
   * Récupérer tout les points relais de l'api
   * (pointRelaisId, pointRelaisAdresse, pointRelaisVille, pointRelaisCodePostal, pointRelaisTypeLibelle, entrepriseLibelle)
   */
  getAllPointRelais(): Observable<any> {
    let response = this.http
      .get(this.pointRelaisListUrl)
      .pipe(catchError(this.handleError<User>("getAllPointRelais")));
    return response;
  }

  /**
   * Récupérer les points relais correspondant à un producteur 
   * (pointRelaisId, pointRelaisAdresse, pointRelaisVille, pointRelaisCodePostal, pointRelaisTypeLibelle, entrepriseLibelle)
   * @param - identifiant du producteur ou client (à prendre dans AuthService)
   * @param - type d'utilisateur : producteur ou client (à prendre dans AuthService)
   */
  getPointRelais(id, userType): Observable<any> {
    let response = this.http
      .get(this.pointRelaisListUrl+"?userType="+userType+"&id="+id, this.httpOptions)
      .pipe(catchError(this.handleError<User>("getPointRelais")));
    return response;
  }

  /**
   * Récupére les types de points relais 
   * (pointRelaisTypeId, pointRelaisTypeLibelle)
   */
  getPointRelaisType(): Observable<any> {
    let response = this.http
      .get(this.pointRelaisTypeListUrl)
      .pipe(catchError(this.handleError<User>("getPointRelaisType")));
    return response;
  }

  /**
   * Récupére les producteur d'un point relais
   * (prodId, prodPrenom, prodNom, prodTel, prodAdresse, prodVille, prodCodePostal, entrepriseLibelle)
   */
  getProducteur(id, userType): Observable<any> {
    let response = this.http
      .get(this.producteurListUrl+"?userType="+userType+"&id="+id, this.httpOptions)
      .pipe(catchError(this.handleError<User>("getProducteur")));
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
