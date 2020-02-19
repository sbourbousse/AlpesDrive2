import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { User } from "src/app/models/user.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"]
})
export class SigninComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {}

  signinForm: FormGroup;
  error = false;
  errorMessage: string;
  isAuth: boolean;

  ngOnInit() {
    this.intiForm();
    this.authService.isAuth.subscribe(isAuth => (this.isAuth = isAuth));
  }

  intiForm(): void {
    this.signinForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6}/)]
      ]
    });
  }

  // Connexion
  onSubmit(): void {
    const email = this.signinForm.get("email").value;
    const password = this.signinForm.get("password").value;

    if (!this.isAuth) {
      this.authService.signinUser(new User(email, password)).subscribe(
        res => {
          console.log(res.auth.message);
          if (res.auth.status == true) {
            this.authService.updateUser(res["data"]);
            this.route.navigate(["/"]);
          } else {
            this.errorMessage = res.auth.message;
          }
        },
        error => {
          console.log("Connexion au serveur impossible.");
        }
      );
    } else {
      this.errorMessage = "Vous êtes déjà connecté.";
    }
  }

  //Déconnexion
  onLogOut(): void {
    this.authService.signoutUser;
  }
}
