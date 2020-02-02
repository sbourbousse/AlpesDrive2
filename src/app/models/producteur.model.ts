import { User } from "./user.model";
import { Entreprise } from "./entreprise.model";

export class Producteur extends User {
  constructor(
    public email: string,
    public password: string,
    public nom: string,
    public prenom: string,
    public telephone: string,
    public adresse: string,
    public ville: string,
    public codePostal: string,
    public entreprise: Entreprise,
    public uniqueId?: number
  ) {
    super(email, password);
  }
  localisation: number;
}
