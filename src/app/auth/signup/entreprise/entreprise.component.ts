import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Entreprise } from "src/app/models/entreprise.model";

@Component({
  selector: "app-entreprise",
  templateUrl: "./entreprise.component.html",
  styleUrls: ["./entreprise.component.scss"]
})
export class EntrepriseComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  entrepriseForm: FormGroup;
  @Output() counterChange = new EventEmitter<Entreprise>();
  id;
  name;
  iBAN;

  ngOnInit() {
    this.initForm();
  }

  //Méthode pour enoyer au component parent une instance d'entreprise
  sendValue() {
    this.counterChange.emit(this.getEntreprise());
  }

  initForm() {
    //TODO validateurs de l'entreprise
    this.entrepriseForm = this.formBuilder.group({
      id: [
        "",
        [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14)
        ]
      ],
      name: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(64)]
      ],
      iBAN: ["", [Validators.minLength(27), Validators.maxLength(34)]]
    });
    this.id = this.entrepriseForm.get("id");
    this.name = this.entrepriseForm.get("name");
    this.iBAN = this.entrepriseForm.get("iBAN");
  }

  // Renvoie null si le formulaire n'est pas correctement remplie
  getEntreprise(): Entreprise {
    const id = this.entrepriseForm.get("id").value;
    const name = this.entrepriseForm.get("name").value;
    const iBAN = this.entrepriseForm.get("iBAN").value;

    if (this.entrepriseForm.valid) {
      if (this.entrepriseForm.get("iBAN").valid)
        return new Entreprise(id, name, iBAN);
      else return new Entreprise(id, name);
    } else {
      return null;
    }
  }
}
