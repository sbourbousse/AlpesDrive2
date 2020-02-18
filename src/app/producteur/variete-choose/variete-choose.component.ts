import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ProducteurService } from '../../services/producteur.service';
import { Variete } from '../../models/variete.model';
@Component({
  selector: 'app-variete-choose',
  templateUrl: './variete-choose.component.html',
  styleUrls: ['./variete-choose.component.scss']
})
export class VarieteChooseComponent implements OnInit {

  constructor(private producteurService: ProducteurService) { }
  @Output() chosenVarieteIdChange = new EventEmitter<number>();
  varieteList : Variete[] = [];
  @Input() produitId;

  ngOnInit() {
    if(this.produitId != null)
    this.getVarietes();
  }

  choose(id) {
    this.chosenVarieteIdChange.next(id);
  }

  getVarietes() {
    this.producteurService.getVariete(this.produitId).subscribe(
      res => {
        if (res != null) {
          console.log(res);
          for (let i = 0; i<res["data"].length ; i++) {
            this.varieteList.push(
              new Variete(
                res["data"][i]["varieteId"],
                res["data"][i]["varieteLibelle"]
              )
            );
          }
          console.log(this.varieteList);
        } else {
          console.log("Aucune variete");
        }
      },
      error => {
        console.log("Connexion au serveur impossible.");
      });
  }

}
