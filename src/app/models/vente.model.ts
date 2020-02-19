export class Vente {
	constructor(
		public prix: number,
		public quantite: number,
		public dateLimiteVente: Date,
		public prodId: number,
		public varieteId: number
	) {}
}