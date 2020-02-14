import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-mail",
  template: `
    <h3>
      Votre inscription est términée!<br />Activez votre compte en cliquant sur
      le lien d'activation reçu sur votre boite mail
    </h3>
  `,
  styleUrls: ["./mail.component.scss"]
})
export class MailComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
