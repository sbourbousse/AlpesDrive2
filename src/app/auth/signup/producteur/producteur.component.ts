import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { User } from "src/app/models/user.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { AfterViewInit, ViewChild } from "@angular/core";
import { EntrepriseComponent } from "../entreprise/entreprise.component";

@Component({
  selector: "app-producteur",
  templateUrl: "./producteur.component.html",
  styleUrls: ["./producteur.component.css"]
})
export class ProducteurComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {}

  //entrepriseInfo: EntrepriseComponent;

  /*getEntrepriseProperty() {
    this.entrepriseInfo.getEntreprise();
  }*/

  ngOnInit() {
    this.initForm();
  }

  //Variables
  @Input() user: User;
  producteurForm: FormGroup;
  errorMessage: string;
  userType: string;

  initForm() {
    this.producteurForm = this.formBuilder.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      address: ["", [Validators.required]],
      city: ["", [Validators.required]],
      postCode: ["", [Validators.required]]
    });
  }

  submitForm() {
    console.log(this.entrepriseInfo.getEntreprise());
  }
}
