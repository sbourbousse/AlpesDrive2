import { User } from "./user.model";

export class Client extends User {
  constructor(
    public email: string,
    public password: string,
    public nom: string,
    public prenom: string,
    public telephone: string,
    public adresse: string,
    public ville: string,
    public codePostal: string,
    public uniqueId?: number
  ) {
    super(email, password);
  }
  localisation: number;
}
