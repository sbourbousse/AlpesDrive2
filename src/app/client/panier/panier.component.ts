import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { VenteInfo } from '../../models/vente.model';
import { NbToastrService } from '@nebular/theme';


@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {

  constructor(private clientService : ClientService,
    private toastrService: NbToastrService) { }
  articleList: VenteInfo[];
  private index: number = 0;

  ngOnInit() {
    this.articleList = this.clientService.panier;
    console.log("liste des articles : ")
    console.log(this.articleList);
  }

  getNombreArticle() {
    return this.articleList.length;
  }

  getSommePanier() {
    let somme: number = 0;
    for(let article of this.articleList) {
      somme = (somme + article.prix*1);
    }
    return somme;
  }

  removeArticle(venteId) {
    this.clientService.removeArticle(venteId).subscribe(
      res => {
        if(res.delete.status) {
          this.articleList.splice(this.articleList.findIndex(article => article.id == venteId), 1)
          console.log("Réussi : "+res.delete.message);
          this.showToast('top-right', 'success', res.delete.message, "Article supprimé")
        } else {
          console.log("Echoué : "+res.delete.message);
          this.showToast('top-right', 'danger', res.delete.message, "Erreur")
        }
      }
    )
  }

  showToast(position, status, message, title) {
    this.index += 1;
    this.toastrService.show(
      title,
      message,
      { position, status });
  }
}
