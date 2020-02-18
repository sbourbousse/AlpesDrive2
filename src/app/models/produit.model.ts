import { Unite } from './unite.model';

export class Produit {
  constructor(
    public id: number,
    public libelle: string,
    public image: string,
    public unite: Unite
  ) {}
}
