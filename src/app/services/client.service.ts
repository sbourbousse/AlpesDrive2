import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'
import { Vente, VenteInfo } from '../models/vente.model';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient : HttpClient) {}

  private venteListUrl = "http://www.sylvain-bourbousse.fr/api/product_list.php";
  private singleVenteUrl = "http://www.sylvain-bourbousse.fr/api/product_detail.php";
  private articleAddUrl = "http://www.sylvain-bourbousse.fr/api/article_add.php";

  venteIdPanier;

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
   * Récupérer les détails de la vente que consulte le client
   * (venteId, prix, quantite, dateAjout, dateLimiteVente, prodPrenom, prodNom, uniteLibelle, varieteLibelle, produitLibelle, produitImage, categorieLibelle, pointRelais: {pointRelaisId, pointRelaisAdresse, pointRelaisVille, pointRelaisCodePostal, entrepriseLibelle, pointRelaisTypeId, pointRelaisTypeLibelle})
   * @param - identifiant de la vente (passé dans l'url)
   */
  getSingleVente(id): Observable<any> {
    return this.httpClient.get(this.singleVenteUrl+"?id="+id)
    .pipe(tap(
      () => console.log(`récupérer une vente`)),
      catchError(this.handleError<Vente>("getVente"))
    )
  }

  addArticle(unArticle: Article): Observable<any> {
    //Ajouter un article dans bdd
    return this.httpClient.post(this.articleAddUrl,unArticle).pipe(
      tap(
        () => console.log(`récupérer une vente`)
      ),
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
