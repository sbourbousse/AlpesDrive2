import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user.model";
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of, BehaviorSubject } from "rxjs";
import { Producteur } from "../models/producteur.model";
import { PointRelais } from "../models/pointRelais.model";
import { Client } from "../models/client.model";
import { TestBed } from '@angular/core/testing';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private isAuthSource = new BehaviorSubject<boolean>(false);
  isAuth = this.isAuthSource.asObservable();
  userType: string; // producteur, point_relais, client
  contextId: number; // id du producteur ou point_relais ou client
  utilisateurId: number;
  prenom: string;
  nom: string;
  pointRelaisList; // ne concerne que les producteurs et points relais

  
  private authUrl: string = "http://sylvain-bourbousse.fr/api/auth.php";
  private signupProducteurUrl: string =
    "http://sylvain-bourbousse.fr/api/producteur_add.php";
  private signupPointRelaisUrl: string =
    "http://sylvain-bourbousse.fr/api/pointRelais_add.php";
  private signupClientUrl: string =
    "http://sylvain-bourbousse.fr/api/client_add.php";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  /** 
   * Envoie un utilisateur à l'api, attend un réponse au format JSON
   * @param  user - utilisateur à authentifier
   */
  signinUser(user: User): Observable<any> {
    let response = this.http.post(this.authUrl, JSON.stringify(user)).pipe(
      tap(() => console.log(`Logging user w/ email=${user.email}`)),
      catchError(this.handleError<User>("signinUser"))
    );

    return response;
  }

  /**
   * Déconnecte l'utilisateur, 
   */
  signoutUser(): void {
    this.setAuthFalse();
    this.userType = null;  
    this.contextId = null;
    this.utilisateurId = null;
    this.prenom = null;
    this.nom = null;
    this.pointRelaisList = null;
  }

  setAuthFalse(): void {
    this.isAuthSource.next(false);
  }

  setAuthTrue(): void {
    this.isAuthSource.next(true);
  }

  /**
   * Stocker les données de l'utilisateur dans ce service
   * @param data - une réponse au format JSON de l'api (auth.php)
   */
  updateUser(data) {
    this.userType = data["userType"];
    this.utilisateurId= data["utilisateurId"];

    if (this.userType == "client"){
      this.prenom= data["clientPrenom"];
      this.nom= data["clientNom"];
      this.contextId= data["clientId"];
    } 
    else if (this.userType == "producteur") {
      this.prenom= data["prodPrenom"];
      this.nom= data["prodNom"];
      this.contextId= data["prodId"];
      this.pointRelaisList= data["pointRelais"];
    } 
    else if (this.userType == "point_relais") {
      this.prenom= data["pointRelaisPrenomGerant"];
      this.nom= data["pointRelaisNomGerant"];
      this.contextId= data["pointRelaisId"];
      this.pointRelaisList= data["pointRelais"];
    }
    this.setAuthTrue();
  }

  /**
   * Envoie à l'api un nouveau producteur à enregistrer
   * @param unProducteur - producteur à envoyer
   */
  signupProcteur(unProducteur: Producteur) {
    let response = this.http
      .post(this.signupProducteurUrl, JSON.stringify(unProducteur))
      .pipe(
        tap(() =>
          console.log(`Sign up producteur w/ email=${unProducteur.email}`)
        ),
        catchError(this.handleError<User>("signupProducteur"))
      );

    return response;
  }

  /**
   * Envoie à l'api un nouveau point relais à enregistrer
   * @param unPointRelais - point relais à envoyer
   */
  signupPointRelais(unPointRelais: PointRelais) {
    let response = this.http
      .post(this.signupPointRelaisUrl, JSON.stringify(unPointRelais))
      .pipe(
        tap(() =>
          console.log(`Sign up point relais w/ email=${unPointRelais.email}`)
        ),
        catchError(this.handleError<User>("signupPointRelais"))
      );

    return response;
  }

  /**
   * Envoie à l'api un nouveau client à enregistrer
   * @param unClient - client à envoyer
   */
  signupClient(unClient: Client) {
    let response = this.http
      .post(this.signupClientUrl, JSON.stringify(unClient))
      .pipe(
        tap(() => console.log(`Sign up client w/ email=${unClient.email}`)),
        catchError(this.handleError<User>("signupClient"))
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
