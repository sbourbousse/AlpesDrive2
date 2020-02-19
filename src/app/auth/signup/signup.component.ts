import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { User } from "../../models/user.model";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {}

  signupForm: FormGroup;
  errorMessage: string;
  userType: string;

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.signupForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6}/)]
      ]
    });
  }

  /**
   * Donner la valeur producteur, client, point relais à la propriété userType
   * Utilisé par le bouton de choix de type d'inscription
   * @param - "producteur", "client" ou "point-relais"
   */
  signupType(userType: string): void {
    switch (userType) {
      case "producteur":
        this.userType = userType;
        break;
      case "point-relais":
        this.userType = userType;
        break;
      case "client":
        this.userType = userType;
        break;
    }
  }

 /**
   * Récupére les valeurs des champs du formulaire 
   * retourne une instance de User ou null si le formulaire n'est pas correctment rempli
   */
  getUser(): User {
    const email = this.signupForm.get("email").value;
    const password = this.signupForm.get("password").value;

    if (this.signupForm.valid) {
      return new User(email, password);
    } else {
      return null;
    }
  }
}
