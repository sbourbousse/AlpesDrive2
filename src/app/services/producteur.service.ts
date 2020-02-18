import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user.model";
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of, BehaviorSubject } from "rxjs";
import { Categorie } from "../models/categorie.model";

@Injectable({
  providedIn: 'root'
})
export class ProducteurService {

  constructor(private http: HttpClient) {}

  private categorieListUrl: string = "http://sylvain-bourbousse.fr/api/categorie_list.php";
  private produitListUrl: string = "http://sylvain-bourbousse.fr/api/produit_list.php";
  private varieteListUrl: string = "http://sylvain-bourbousse.fr/api/variete_list.php";


  
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  getAllCategorie() {
    let response = this.http
      .get(this.categorieListUrl)
      .pipe(catchError(this.handleError<User>("getAllCategorie")));
    return response;
  } //TODO

  getProduit(unIdCategorie) {
    let response = this.http
      .get(this.produitListUrl+"?catId="+unIdCategorie)
      .pipe(catchError(this.handleError<User>("getProduit")));
    return response;
  }

  getVariete(unIdProduit) {
    let response = this.http
      .get(this.varieteListUrl+"?proId="+unIdProduit)
      .pipe(catchError(this.handleError<User>("getVariete")));
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
