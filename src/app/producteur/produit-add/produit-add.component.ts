import { Component, OnInit, NgModule } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProducteurService } from '../../services/producteur.service';
import { AuthService } from '../../services/auth.service';
import { Categorie } from 'src/app/models/categorie.model';
import { Produit } from 'src/app/models/produit.model';
import { Variete } from 'src/app/models/variete.model';
import { Vente } from 'src/app/models/vente.model';


@Component({
  selector: 'app-produit-add',
  templateUrl: './produit-add.component.html',
  styleUrls: ['./produit-add.component.scss'],

})
export class ProduitAddComponent implements OnInit {

  constructor(
    private dialogService: NbDialogService,
    private formBuilder: FormBuilder,
    private producteurService: ProducteurService,
    protected authService: AuthService
  ) {}

  categorie: Categorie;
  produit: Produit;
  variete: Variete;
  produitForm: FormGroup;
  isFormInitialized: boolean = false;
  prix;
  quantite;
  date;
  errorMessage;
  error = false;
  loading = true;

  ngOnInit() {
  }

  initForm(): void {
    this.produitForm = this.formBuilder.group({
      prix: [
        "",
        [Validators.required]
      ],
      quantite: [
        "",
        [Validators.required]
      ],
      date: [
        "",
        [Validators.required]
      ]
    });
    this.prix = this.produitForm.get("prix").value;
    this.quantite = this.produitForm.get("quantite").value;
    this.date = this.produitForm.get("date").value;
    console.log("formulaire initialisé");
    this.isFormInitialized = true;
  }

  /**
   * Récupére les valeurs des champs du formulaire 
   * retourne une instance de Vente ou null si le formulaire n'est pas correctment rempli
   */
  getVente(): Vente {
    this.prix = this.produitForm.get("prix").value;
    this.quantite = this.produitForm.get("quantite").value;
    this.date = this.produitForm.get("date").value;

    if(this.variete.id != null && this.produitForm.valid && this.authService.contextId != null) {
      return new Vente(
        this.prix,
        this.quantite,
        this.date,
        this.authService.contextId,
        this.variete.id
      )
    } else {
      return null;
    }
  }

  //Envoi de la vente
  submitForm() {
    console.log(this.getVente());
    if(this.getVente() != null) {
      this.producteurService.createNewVente(this.getVente()).subscribe(
        res => {
          if (res["new"]["status"] == true) {
            this.loading = false;
          } else {
            this.errorMessage = res["new"]["message"];
            this.error = true;
          }
        },
        error => {
          console.log("Connexion au serveur impossible.");
        }
      );
    } else {
      console.log("Impossible d'envoyer la vente");
    }
  }
}
