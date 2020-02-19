import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProducteurService } from '../../services/producteur.service';

@Component({
  selector: 'app-vente-list',
  templateUrl: './vente-list.component.html',
  styleUrls: ['./vente-list.component.scss']
})
export class VenteListComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private producteurService: ProducteurService
  ) {}

  venteListe = [];
  complete= false;
  empty= false;

  ngOnInit() {
    this.getVente();
  }

  /**
   * Récupère toutes les ventes qu'à efféctué le producteur,
   * les ajoutes à la propriétée pointRelaisListe ou empty recoit true si le producteur n'a pas de point relais
   */
  getVente(): void {
    this.producteurService.getVente(this.authService.contextId).subscribe(
      res => {
        console.log(res);
        if (res != null) {
          for (let i = 0 ; i<res["data"].length ; i++) {
            let uneVente = [];
            uneVente["id"] = res["data"][i]["venteId"];
            uneVente["prix"] = res["data"][i]["prix"];
            uneVente["quantite"] = res["data"][i]["quantite"];
            uneVente["dateAjout"] = res["data"][i]["dateAjout"];
            uneVente["dateLimiteVente"] = res["data"][i]["dateLimiteVente"];
            uneVente["valide"] = res["data"][i]["valide"];            
            uneVente["prodId"] = res["data"][i]["prodId"];
            uneVente["variete"] = res["data"][i]["varieteLibelle"];
            uneVente["produit"] = res["data"][i]["produitLibelle"];
            uneVente["image"] = res["data"][i]["produitImage"];
            uneVente["categorie"] = res["data"][i]["categorieLibelle"];
            uneVente["unite"] = res["data"][i]["uniteLettre"];

            this.venteListe.push(uneVente);
          }
          console.log(this.venteListe);
          this.complete = true;
        } else {
          // Some error
        }
      },
      error => {
        console.log("Connexion au serveur impossible.");
      }
    );
  }
}
