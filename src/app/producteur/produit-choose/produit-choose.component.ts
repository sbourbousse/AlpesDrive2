import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ProducteurService } from '../../services/producteur.service';
import { Produit } from '../../models/produit.model';

@Component({
  selector: 'app-produit-choose',
  templateUrl: './produit-choose.component.html',
  styleUrls: ['./produit-choose.component.scss']
})
export class ProduitChooseComponent implements OnInit {

  constructor(private producteurService: ProducteurService) { }
  @Output() chosenProduitIdChange = new EventEmitter<number>();
  produitList : Produit[] = [];
  @Input() categorieId;

  ngOnInit() {
    if(this.categorieId != null)
    this.getCategories();
  }

  choose(id) {
    this.chosenProduitIdChange.next(id);
  }

  getCategories() {
    this.producteurService.getProduit(this.categorieId).subscribe(
      res => {
        if (res != null) {
          console.log(res);
          for (let i = 0; i<res["data"].length ; i++) {
            this.produitList.push(
              new Produit(
                res["data"][i]["produitId"],
                res["data"][i]["produitLibelle"],
                res["data"][i]["produitImage"]
              )
            );
          }
          console.log(this.produitList);
        } else {
          console.log("Aucun produit");
        }
      },
      error => {
        console.log("Connexion au serveur impossible.");
      });
  }

}
