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

  ngOnInit() {
    this.initForm();
    //this.authService.isAuth.subscribe(isAuth => (this.isAuth = isAuth));
  }

  //Variables
  signupForm: FormGroup;
  errorMessage: string;
  //private isAuth: boolean;
  userType: string;

  //Méthodes
  initForm() {
    this.signupForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6}/)]
      ]
    });
  }

  signupType(userType: string) {
    console.log("Vous avez choisi " + userType);
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
