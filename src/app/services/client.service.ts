import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'
import { Vente, VenteInfo } from '../models/vente.model';
import { Article } from '../models/article.model';
import { AuthService } from './auth.service';
import { environment } from '../models/api.model';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private httpClient : HttpClient
    ) {}

  private venteListUrl =  environment.apiUrl+"product_list.php";
  private singleVenteUrl =  environment.apiUrl+"product_detail.php";
  private articleAddUrl =  environment.apiUrl+"article_add.php";
  private articleListUrl =  environment.apiUrl+"article_list.php";
  private articleRemoveUrl =  environment.apiUrl+"article_remove.php";
  private commandeAddUrl =  environment.apiUrl+"commande_add.php"

  panier: VenteInfo[];
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

  /**
   * Récupérer les détails de la vente que consulte le client
   * (venteId, prix, quantite, dateAjout, dateLimiteVente, prodPrenom, prodNom, uniteLibelle, varieteLibelle, produitLibelle, produitImage, categorieLibelle, pointRelais: {pointRelaisId, pointRelaisAdresse, pointRelaisVille, pointRelaisCodePostal, entrepriseLibelle, pointRelaisTypeId, pointRelaisTypeLibelle})
   * @param - identifiant de la vente (passé dans l'url)
   */
  addArticle(unArticle: Article): Observable<any> {
    //Ajouter un article dans bdd
    return this.httpClient.post(this.articleAddUrl,unArticle).pipe(
      tap(
        () => console.log(`ajouter un article`)
      ),
      catchError(this.handleError<Vente>("addArticle"))
    )
  }

  resultToVenteInfo(dataFromAPI): VenteInfo {
    const getPointRelaisList = () => {
      let pointRelaisList = [];
      for (let unPointRelais of dataFromAPI.pointRelais) {
        pointRelaisList.push({
          id : unPointRelais.pointRelaisId,
          adresse : unPointRelais.pointRelaisAdresse,
          ville : unPointRelais.pointRelaisVille,
          codePostal : unPointRelais.pointRelaisCodePostal,
          libelle : unPointRelais.entrepriseLibelle,
          typeId : unPointRelais.pointRelaisTypeId,
          typeLibelle : unPointRelais.pointRelaisTypeLibelle
        });
      }
      return pointRelaisList;
    };

    let infoDeLaVente: VenteInfo = {
      id : dataFromAPI.venteId,
      prix : dataFromAPI.prix,
      quantite : dataFromAPI.quantite,
      dateAjout : dataFromAPI.dateAjout,
      dateLimiteVente : dataFromAPI.dateLimiteVente,
      producteur : {
        nom : dataFromAPI.prodNom,
        prenom : dataFromAPI.prodPrenom
      },
      unite : dataFromAPI.uniteLibelle,
      variete : dataFromAPI.varieteLibelle,
      produit : dataFromAPI.produitLibelle,
      categorie : dataFromAPI.categorieLibelle,
      image : dataFromAPI.produitImage,
      pointRelaisList: getPointRelaisList()
    }  

    return infoDeLaVente;
  }

  /**
   * Récupérer les article dans le panier du client
   * @param - identifiant de la vente (passé dans l'url)
   */
  getArticle(idClient): Observable<any> {
    //Ajouter un article dans bdd
    return this.httpClient.get(this.articleListUrl+"?id="+idClient).pipe(
      tap(
        () => console.log(`récuperer les articles`)
      ),
      catchError(this.handleError<Vente>("getArticle"))
    )
  }

  removeArticle(idVente, idClient): Observable<any> {
    //Ajouter un article dans bdd
    const article = {idVente : idVente, idClient : idClient};
    return this.httpClient.post(this.articleRemoveUrl,JSON.stringify(article)).pipe(
      tap(
        () => console.log(`supprimer un article`)
      ),
      catchError(this.handleError<Vente>("removeArticle"))
    )
  }

  addCommande(idClient): Observable<any> {
    const client = {idClient: idClient};
    return this.httpClient.post(this.commandeAddUrl, JSON.stringify(client)).pipe(
      tap(
        () => console.log(`Ajout de commande`)
      ),
      catchError(this.handleError<Vente>("addCommande"))
    )
  }

  updatePanier(id): void {
    this.panier = [];
    this.getArticle(id).subscribe(
      res => {
        const data = res.data;

        for (let i = 0 ; i<data.length ; i++) {
          //les ajouter dans mon panier
          this.panier.push(this.resultToVenteInfo(data[i]));
        }
      }
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
