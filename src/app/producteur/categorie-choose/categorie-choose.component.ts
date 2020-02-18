import { Component, OnInit, NgModule, EventEmitter, Output } from '@angular/core';
import { Categorie } from '../../models/categorie.model';
import { ProducteurService } from '../../services/producteur.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categorie-choose',
  templateUrl: './categorie-choose.component.html',
  styleUrls: ['./categorie-choose.component.scss']
})
export class CategorieChooseComponent implements OnInit {

  constructor(
    private producteurService: ProducteurService
    ) { }
  categorieList : Categorie[] = [];
  @Output() chosenCategorieIdChange = new EventEmitter<number>();

  ngOnInit() {
    this.getCategories();
  }

  choose(id) {
    this.chosenCategorieIdChange.next(id);
  }

  getCategories() {
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
