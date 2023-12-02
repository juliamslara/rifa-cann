export class Rifa {
  id!: string;
  pagamento: string;
  telefone: string;
  nome: string;

  constructor(pagamento: string, telefone: string, nome: string) {
    this.pagamento = pagamento;
    this.telefone = telefone;
    this.nome = nome.length > 1 ? nome : '';
  }
}
