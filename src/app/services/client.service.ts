import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'
import { Vente } from '../models/vente.model';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient : HttpClient) {}

  private venteListUrl = "http://www.sylvain-bourbousse.fr/api/product_list.php";

  /**
   * Récupérer les ventes accessible à un client 
   * (venteId, prix, quantite, dateAjout, dateLimiteVente, prodPrenom, prodNom, uniteLibelle, varieteLibelle, produitLibelle, produitImage, categorieLibelle, nbPointRelaisProposant)
   * @param - identifiant du client (à prendre dans AuthService)
   */
  getVente(id): Observable<any> {
    return this.httpClient.get(this.venteListUrl+"?userType=client&id="+id)
      .pipe(tap(
        () => console.log(`récupérer les ventes`)),
        catchError(this.handleError<Vente>("getVente"))
      )
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
