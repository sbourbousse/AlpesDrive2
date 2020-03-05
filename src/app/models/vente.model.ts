export class Vente {
	constructor(
		public prix: number,
		public quantite: number,
		public dateLimiteVente: Date,
		public prodId: number,
		public varieteId: number
	) {}
}

export interface VenteInfo {
	id,
	prix,
	quantite,
	dateAjout,
	dateLimiteVente,
	producteur: {
	  nom,
	  prenom
	},
	unite,
	variete,
	produit,
	categorie,
	image,
	pointRelaisList: {
	  id,
	  adresse,
	  ville,
	  codePostal,
	  libelle,
	  typeId,
	  typeLibelle
	}[]
	pointRelaisChoisi?
};