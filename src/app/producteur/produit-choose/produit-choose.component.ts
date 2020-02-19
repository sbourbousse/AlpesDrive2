import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ProducteurService } from '../../services/producteur.service';
import { Produit } from '../../models/produit.model';
import { Unite } from '../../models/unite.model';

@Component({
  selector: 'app-produit-choose',
  templateUrl: './produit-choose.component.html',
  styleUrls: ['./produit-choose.component.scss']
})
export class ProduitChooseComponent implements OnInit {

  constructor(private producteurService: ProducteurService) {}

  @Output() chosenProduitChange = new EventEmitter<Produit>();
  produitList : Produit[] = [];
  @Input() categorieId;

  ngOnInit() {
    if(this.categorieId != null)
    this.getProduits();
  }

  /**
   * Changer la valeur de la propriété chosenProduitChange
   * @param produit - nouveau produit
   */
  choose(produit: Produit): void {
    this.chosenProduitChange.next(produit);
  }

  /**
   * Récupère tout les produits depuis le service, 
   * insère les types dans la propriétée produitList
   */
  getProduits(): void {
    this.producteurService.getProduit(this.categorieId).subscribe(
      res => {
        if (res != null) {
          console.log(res);
          for (let i = 0; i<res["data"].length ; i++) {
            this.produitList.push(
              new Produit(
                res["data"][i]["produitId"],
                res["data"][i]["produitLibelle"],
                res["data"][i]["produitImage"],
                new Unite(
                  res["data"][i]["uniteId"],
                  res["data"][i]["uniteLibelle"],
                  res["data"][i]["uniteLettre"],
                  res["data"][i]["uniteQuantiteVente"]
                  )
              )
            );
          }
        } else {
          console.log("Aucun produit");
        }
      },
      error => {
        console.log("Connexion au serveur impossible.");
      });
  }

}
