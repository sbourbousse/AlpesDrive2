import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { User } from "src/app/models/user.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { AfterViewInit, ViewChild } from "@angular/core";
import { EntrepriseComponent } from "../entreprise/entreprise.component";
import { Entreprise } from "src/app/models/entreprise.model";
import { Producteur } from "src/app/models/producteur.model";

@Component({
  selector: "app-producteur",
  templateUrl: "./producteur.component.html",
  styleUrls: ["./producteur.component.scss"]
})
export class ProducteurComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {}

  @Input() user: User;
  producteurForm: FormGroup;
  errorMessage: string;
  userType: string;
  monEntreprise: Entreprise;
  lastname;
  firstname;
  phone;
  address;
  city;
  postCode;

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.producteurForm = this.formBuilder.group({
      firstname: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
      ],
      lastname: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
      ],
      phone: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      address: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      city: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
      ],
      postCode: [
        "",
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)]
      ]
    });
    this.lastname = this.producteurForm.get("lastname");
    this.firstname = this.producteurForm.get("firstname");
    this.phone = this.producteurForm.get("phone");
    this.address = this.producteurForm.get("address");
    this.city = this.producteurForm.get("city");
    this.postCode = this.producteurForm.get("postCode");
  }

  /**
   * Récupére les valeurs des champs du formulaire 
   * retourne une instance de Producteur ou null si le formulaire n'est pas correctment rempli
   */
  getProducteur(): Producteur {
    const email = this.user.email;
    const password = this.user.password;
    const lastname = this.producteurForm.get("lastname").value;
    const firstname = this.producteurForm.get("firstname").value;
    const phone = this.producteurForm.get("phone").value;
    const address = this.producteurForm.get("address").value;
    const city = this.producteurForm.get("city").value;
    const postCode = this.producteurForm.get("postCode").value;
    if (this.producteurForm.valid) {
      return new Producteur(
        email,
        password,
        lastname,
        firstname,
        phone,
        address,
        city,
        postCode,
        this.monEntreprise
      );
    } else {
      return null;
    }
  }

  //Envoi du producteur
  submitForm(): void {
    console.log(this.getProducteur());
    if (this.getProducteur() != null) {
      this.authService.signupProcteur(this.getProducteur()).subscribe(
        res => {
          if (res["new"]["status"] == true) {
            console.log(res); //debogage
          } else {
            this.errorMessage = res["new"]["message"];
            console.log(res); //debogage
          }
        },
        error => {
          console.log("Connexion au serveur impossible.");
        }
      );
    } else {
      this.errorMessage = "Remplir les champs correctement";
    }
  }
}
