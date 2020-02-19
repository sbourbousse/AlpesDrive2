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

  initForm(): void {
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

  /**
   * Méthode pour envoyer au component parent une instance de l'entreprise, 
   * effectué à chaque changement de valeurs des champs du formulaire
   */
  sendValue(): void {
    this.counterChange.emit(this.getEntreprise());
  }

  /**
   * Récupére les valeurs des champs du formulaire 
   * retourne une instance d'Entreprise ou null si le formulaire n'est pas correctment rempli
   */
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
