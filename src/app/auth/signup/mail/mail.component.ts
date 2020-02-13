import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-mail",
  template: `
    <p>
      Un mail de vérification vous a été envoyé. Vérifiez votre boite de
      réception.
    </p>
  `,
  styleUrls: ["./mail.component.scss"]
})
export class MailComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
