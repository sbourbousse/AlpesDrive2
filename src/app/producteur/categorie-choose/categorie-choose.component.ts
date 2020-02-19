import { Component, OnInit, NgModule, EventEmitter, Output } from '@angular/core';
import { Categorie } from '../../models/categorie.model';
import { ProducteurService } from '../../services/producteur.service';

@Component({
  selector: 'app-categorie-choose',
  templateUrl: './categorie-choose.component.html',
  styleUrls: ['./categorie-choose.component.scss']
})
export class CategorieChooseComponent implements OnInit {

  constructor(
    private producteurService: ProducteurService
    ) {}

  categorieList : Categorie[] = [];
  @Output() chosenCategorieChange = new EventEmitter<Categorie>();

  ngOnInit() {
    this.getCategories();
  }

  /**
   * Changer la valeur de la propriété chosenCategorieChange
   * @param categorie - nouvelle catégorie
   */
  choose(categorie: Categorie): void {
    this.chosenCategorieChange.next(categorie);
  }

  /**
   * Récupère toutes les catégories depuis le service, 
   * insère les types dans la propriétée categorieList
   */
  getCategories(): void {
    this.producteurService.getAllCategorie().subscribe(
      res => {
        if (res != null) {
          for (let i = 0; i<res["data"].length ; i++) {
            this.categorieList.push(
              new Categorie(
                res["data"][i]["categorieId"],
                res["data"][i]["categorieLibelle"],
                res["data"][i]["categorieImage"]
              )
            );
          }
          console.log(this.categorieList);
        } else {
          console.log("Aucune catégorie");
        }
      },
      error => {
        console.log("Connexion au serveur impossible.");
      });
  }

}
