import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user.model";
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of, BehaviorSubject } from "rxjs";
import { Categorie } from "../models/categorie.model";
import { Vente } from 'src/app/models/vente.model';
import { AuthService } from './auth.service';
import { environment } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class ProducteurService {

  constructor(private http: HttpClient) {}

  private categorieListUrl: string = environment.apiUrl+"categorie_list.php";
  private produitListUrl: string = environment.apiUrl+"produit_list.php";
  private varieteListUrl: string = environment.apiUrl+"variete_list.php";
  private venteAddUrl: string = environment.apiUrl+"vente_add.php";
  private venteListUrl: string = environment.apiUrl+"vente_list.php";


  
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  /**
   * Récupère toutes les catégories depuis l'api
   * (categorieId, categorieLibelle, categorieImage)
   */
  getAllCategorie(): Observable <any> {
    let response = this.http
      .get(this.categorieListUrl)
      .pipe(catchError(this.handleError<User>("getAllCategorie")));
    return response;
  }

  /**
   * Récupère tout les produits et leurs unités d'une catégorie depuis l'api
   * (produitId, produitLibelle, produitImage, unite.uniteId, uniteLibelle, uniteLettre, uniteQuantiteVente)
   * @param unIdCategorie - id de la catégorie dont on veut les produits
   */
  getProduit(unIdCategorie: number): Observable <any> {
    let response = this.http
      .get(this.produitListUrl+"?catId="+unIdCategorie)
      .pipe(catchError(this.handleError<User>("getProduit")));
    return response;
  }

   /**
   * Récupère toute les variétées d'un produit depuis l'api
   * (varieteId, varieteLibelle)
   * @param unIdProduit - id du produit dont on veut les variétées
   */
  getVariete(unIdProduit): Observable <any> {
    let response = this.http
      .get(this.varieteListUrl+"?proId="+unIdProduit)
      .pipe(catchError(this.handleError<User>("getVariete")));
    return response;
  }

  /**
   * Récupère toute les ventes d'un producteur depuis l'api
   * (venteId, prix, quantite, dateAjout, dateLimiteVente, valide, prodId, varieteLibelle, produitLibelle, produitImage, categorieLibelle, uniteLettre)
   */
  getVente(id: number): Observable <any> {
    let response = this.http
      .get(this.venteListUrl+"?id="+id)
      .pipe(catchError(this.handleError<User>("getVente")));
    return response;
  }

  /**
   * Envoie une vente à l'api pour être ajoutée dans la base de données
   * @param uneVente - vente à envoyer
   */
  createNewVente(uneVente: Vente) {
    let response = this.http
      .post(this.venteAddUrl, JSON.stringify(uneVente))
      .pipe(
        tap(() =>
          console.log(`ajout de produit`)
        ),
        catchError(this.handleError<User>("createNewVente"))
      );
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
