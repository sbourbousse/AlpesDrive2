import { Component, OnInit } from '@angular/core';
import { PointRelaisService } from '../../services/point-relais.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-producteur-list',
  templateUrl: './producteur-list.component.html',
  styleUrls: ['./producteur-list.component.scss']
})
export class ProducteurListComponent implements OnInit {
  constructor(
    private pointRelaisService: PointRelaisService, 
    private authService: AuthService
  ) {}

  producteurListe = [];
  complete= false;
  empty= false;

  ngOnInit() {
    this.getProducteur();
  }

  /**
   * Récupère tout les produucteurs inscris à un point relais,
   * les ajoutes à la propriétée producteurListe ou empty recoit true si le point-relais n'a pas de producteur
   */
  getProducteur(): void {
    if (this.authService.producteurList != null) {
      const userType="point_relais";

      this.pointRelaisService.getProducteur(this.authService.contextId,userType).subscribe(
        res => {
          //(prodId, prodPrenom, prodNom, prodTel, prodAdresse, prodVille, prodCodePostal, entrepriseLibelle)
          console.log(res);
          if (res != null) {
            for (let i = 0 ; i<res["data"].length ; i++) {
              let unProducteur = [];
              unProducteur["id"] = res["data"][i]["prodId"];
              unProducteur["prenom"] = res["data"][i]["prodPrenom"];
              unProducteur["nom"] = res["data"][i]["prodNom"];
              unProducteur["tel"] = res["data"][i]["prodTel"];
              unProducteur["adresse"] = res["data"][i]["prodAdresse"];
              unProducteur["ville"] = res["data"][i]["prodVille"];
              unProducteur["codePostal"] = res["data"][i]["prodCodePostal"];
              unProducteur["libelle"] = res["data"][i]["entrepriseLibelle"];

              this.producteurListe.push(unProducteur);
            }
            console.log(this.producteurListe);
            this.complete = true;
          } else {
            // Some error
            console.log("error")
          }
        },
        error => {
          console.log("Connexion au serveur impossible.");
        }
      );
    } else {
      this.empty = true;
    }
  }
}
