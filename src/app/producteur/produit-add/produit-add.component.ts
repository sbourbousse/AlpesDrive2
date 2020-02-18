import { Component, OnInit, NgModule } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CategorieChooseComponent } from '../categorie-choose/categorie-choose.component';
import { ProduitChooseComponent } from '../produit-choose/produit-choose.component';
import { VarieteChooseComponent } from '../variete-choose/variete-choose.component';


@Component({
  selector: 'app-produit-add',
  templateUrl: './produit-add.component.html',
  styleUrls: ['./produit-add.component.scss'],

})
export class ProduitAddComponent implements OnInit {

  constructor(private dialogService: NbDialogService) {
  }
  categorieId;
  produitId;
  varieteId;

  ngOnInit() {
  }

  test() {
    console.log(this.categorieId);
    console.log(this.produitId);

  }
}
