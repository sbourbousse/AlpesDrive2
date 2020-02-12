import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user.model";
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of, BehaviorSubject } from "rxjs";
import { Producteur } from "../models/producteur.model";
import { PointRelais } from "../models/pointRelais.model";
import { Client } from "../models/client.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private isAuthSource = new BehaviorSubject<boolean>(false);
  isAuth = this.isAuthSource.asObservable();
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

  signinUser(user: User): Observable<any> {
    let response = this.http.post(this.authUrl, JSON.stringify(user)).pipe(
      tap(() => console.log(`Logging user w/ email=${user.email}`)),
      catchError(this.handleError<User>("signinUser"))
    );

    return response;
  }

  signoutUser() {
    this.setAuthFalse();
    console.log("Deconnexion");
  }

  setAuthFalse(): void {
    this.isAuthSource.next(false);
  }

  setAuthTrue(): void {
    this.isAuthSource.next(true);
  }

  //Inscriptions
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
