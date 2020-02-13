import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { User } from "src/app/models/user.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { AfterViewInit, ViewChild } from "@angular/core";
import { Client } from "src/app/models/client.model";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.scss"]
})
export class ClientComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  //Variables
  @Input() user: User;
  clientForm: FormGroup;
  errorMessage: string;
  userType: string;

  initForm() {
    this.clientForm = this.formBuilder.group({
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
  }

  getClient(): Client {
    const email = this.user.email;
    const password = this.user.password;
    const lastname = this.clientForm.get("lastname").value;
    const firstname = this.clientForm.get("firstname").value;
    const phone = this.clientForm.get("phone").value;
    const address = this.clientForm.get("address").value;
    const city = this.clientForm.get("city").value;
    const postCode = this.clientForm.get("postCode").value;

    if (this.clientForm.valid) {
      return new Client(
        email,
        password,
        lastname,
        firstname,
        phone,
        address,
        city,
        postCode
      );
    } else {
      return null;
    }
  }

  //Souscription du formulaire
  submitForm() {
    console.log(this.getClient());
    if (this.getClient() != null) {
      this.authService.signupClient(this.getClient()).subscribe(
        res => {
          console.log(res);
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
