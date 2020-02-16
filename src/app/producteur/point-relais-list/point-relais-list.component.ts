import { Component, OnInit } from '@angular/core';
import { PointRelaisService } from '../../services/point-relais.service';
import { AuthService } from '../../services/auth.service';
import { PointRelais } from 'src/app/models/pointRelais.model';

@Component({
  selector: 'app-point-relais-list',
  templateUrl: './point-relais-list.component.html',
  styleUrls: ['./point-relais-list.component.scss']
})
export class PointRelaisListComponent implements OnInit {

  constructor(private pointRelaisService: PointRelaisService, private authService: AuthService) { }
  pointRelaisListe = [];
  complete= false;

  pointRelais() {

  }
  ngOnInit() {
    this.getPointRelais();
  }

  getPointRelais() {
    let userType="producteur";

    this.pointRelaisService.getPointRelais(this.authService.contextId,userType).subscribe(
      res => {
        console.log(res);
        if (res != null) {
          for (let i = 0 ; i<res["data"].length ; i++) {
            let unPointRelais = [];
            unPointRelais["id"] = res["data"][i]["pointRelaisId"];
            unPointRelais["adresse"] = res["data"][i]["pointRelaisAdresse"];
            unPointRelais["ville"] = res["data"][i]["pointRelaisVille"];
            unPointRelais["codePostal"] = res["data"][i]["pointRelaisCodePostal"];
            unPointRelais["typeLibelle"] = res["data"][i]["pointRelaisTypeLibelle"];
            unPointRelais["libelle"] = res["data"][i]["entrepriseLibelle"];

            this.pointRelaisListe.push(unPointRelais);
          }
          console.log(this.pointRelaisListe);
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
