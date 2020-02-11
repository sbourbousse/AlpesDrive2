import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { User } from "src/app/models/user.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { PointRelaisService } from "src/app/services/point-relais.service";
import { AfterViewInit, ViewChild } from "@angular/core";
import { EntrepriseComponent } from "../entreprise/entreprise.component";
import { Entreprise } from "src/app/models/entreprise.model";
import { PointRelais } from "src/app/models/pointRelais.model";
import { PointRelaisType } from "src/app/models/pointRelaisType.model";

@Component({
  selector: "app-point-relais",
  templateUrl: "./point-relais.component.html",
  styleUrls: ["./point-relais.component.css"]
})
export class PointRelaisComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private pointRelaisService: PointRelaisService,
    private route: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  onCounterChange(entreprise: Entreprise) {
    this.monEntreprise = entreprise;
  }

  //Variables
  @Input() user: User;
  pointRelaisForm: FormGroup;
  errorMessage: string;
  userType: string;
  monEntreprise: Entreprise;

  initForm() {
    this.pointRelaisForm = this.formBuilder.group({
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
      ],
      type: ["", [Validators.required]]
    });
  }

  getPointRelais(): PointRelais {
    const email = this.user.email;
    const password = this.user.password;
    const lastname = this.pointRelaisForm.get("lastname").value;
    const firstname = this.pointRelaisForm.get("firstname").value;
    const phone = this.pointRelaisForm.get("phone").value;
    const address = this.pointRelaisForm.get("address").value;
    const city = this.pointRelaisForm.get("city").value;
    const postCode = this.pointRelaisForm.get("postCode").value;
    if (this.pointRelaisForm.valid) {
      return new PointRelais(
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

  //Souscription du formulaire
  submitForm() {
    console.log(this.getPointRelais());
    if (this.getPointRelais() != null) {
      this.authService.signupProcteur(this.getPointRelais()).subscribe(
        res => {
          if (res["new"]["status"] == true) {
            this.route.navigate(["/inscription/mail"]);
            console.log(res);
          } else {
            this.errorMessage = res["new"]["message"];
            console.log(res);
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
