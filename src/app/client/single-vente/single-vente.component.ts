import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { AuthService } from '../../services/auth.service';
import { VenteInfo } from '../../models/vente.model';
import { Article } from '../../models/article.model';
import { Router } from '@angular/router'
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-single-vente',
  templateUrl: './single-vente.component.html',
  styleUrls: ['./single-vente.component.scss']
})
export class SingleVenteComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: NbToastrService
  ) { }
  id;
  venteInfo: VenteInfo;
  notFound = false;
  error = false;
  achatForm: FormGroup;
  private index: number = 0;


  ngOnInit() {
    this.id = this.route.snapshot.params.id
    this.initForm();
    this.getVente(this.id);
  }

  initForm(): void {
    this.achatForm = this.formBuilder.group({
      pointRelais: [
        "",
        [Validators.required]
      ]
    });
  }

  /**
   * Récupère toutes les détails d'une vente,
   * les ajoutes à la propriétée venteInfo ou not found recoit true si le produit n'existe pas
   */
  getVente(id) {
    this.clientService.getSingleVente(id).subscribe(
      res => {
        if (res.data != null) {
          const data = res.data;
          this.venteInfo = this.clientService.resultToVenteInfo(data);
        } else {
          this.notFound = true;
        }
      },
      error => {
        this.error = true;
      }
    )
  }

  getArticle(): Article {
    const pointRelaisIdSelected = this.achatForm.get("pointRelais").value;
    console.log(pointRelaisIdSelected);
    if (!this.error) { //TODO remplacer par si id du point relais selectionné not null
      return new Article(
        this.venteInfo.quantite,
        this.authService.contextId,
        this.venteInfo.id,
        pointRelaisIdSelected
      )
    } else {
      return null;
    }
  }

  submit() {
    let nouvelleArticle: Article = this.getArticle();
    console.log(nouvelleArticle);

    if (nouvelleArticle != null) {
      this.clientService.addArticle(nouvelleArticle).subscribe(
        res => {
          if(res.new.status == true) {
            this.clientService.updatePanier(this.authService.contextId);
            this.router.navigate(["/client/panier"]);
          }
          else {
            console.log(res.new.message)
            this.showToast('top-right', 'danger', 'Erreur', res.new.message)
          }
        },
        error => {
        
        }
      )
    }
  }

  showToast(position, status, message, title) {
    this.index += 1;
    this.toastrService.show(
      title,
      message,
      { position, status });
  }

  
}
