import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-vente-list2',
  templateUrl: './vente-list2.component.html',
  styleUrls: ['./vente-list2.component.scss']
})
export class VenteList2Component implements OnInit {

  constructor(
    private authService: AuthService,
    private clientService : ClientService
    ) {}

  ngOnInit() {
    this.getVente();
  }

  venteList = [];
  empty = false;
  loading  =true;

  /**
   * Récupère toutes les ventes accessible au client,
   * les ajoutes à la propriétée venteListe ou empty recoit true si le client n'a pas de ventes accessible
   */
  getVente() {
    if (this.authService.pointRelaisList != null) {
      const id = this.authService.contextId;
      this.clientService.getVente(id).subscribe(
        res => {
          if (res["data"] != null) {
            for(let i = 0 ; i<res["data"].length ; i++) {
              let uneVente = [];
              uneVente["id"] = res["data"][i]["venteId"];
              uneVente["prix"] = res["data"][i]["prix"];
              uneVente["quantite"] = res["data"][i]["quantite"];
              uneVente["dateAjout"] = res["data"][i]["dateAjout"];
              uneVente["dateLimiteVente"] = res["data"][i]["dateLimiteVente"];
              uneVente["prenom"] = res["data"][i]["prodPrenom"];
              uneVente["nom"] = res["data"][i]["prodNom"];
              uneVente["unite"] = res["data"][i]["uniteLibelle"];
              uneVente["variete"] = res["data"][i]["varieteLibelle"];
              uneVente["produit"] = res["data"][i]["produitLibelle"];
              uneVente["image"] = res["data"][i]["produitImage"];
              uneVente["categorie"] = res["data"][i]["categorieLibelle"];
              uneVente["nombreProposant"] = res["data"][i]["nbPointRelaisProposant"];

              this.venteList.push(uneVente);
            }
            console.log(this.venteList);
            this.loading = false;
          } else {
            this.empty = true;
          }
        }
      )
    }
  }

}
