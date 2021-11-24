import { Modelo } from "../interfaces/modelo.js";

export class Negociacao implements Modelo<Negociacao> {

    constructor(
        private _data: Date, // por ser um objeto, é possivel alterar por metodos da classe, melhor usar private e getters
        public readonly quantidade: number,
        public readonly valor: number) { }

    public static criaDe(dateString: string, quantidadeString: string, valorString: string): Negociacao {
        const exp = /-/g;
        const date = new Date(dateString.replace(exp, ","));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);
        return new Negociacao(date, quantidade, valor);
    }

    public paraTexto(): string {
        return `
            Data: ${this.data},
            Quantidade : ${this.quantidade},
            Valor: ${this.valor}
    `;
    }

    public ehIgual(negociacao: Negociacao): boolean {
        return this.data.getDate() === negociacao.data.getDate()
            && this.data.getMonth() === negociacao.data.getMonth()
            && this.data.getFullYear() === negociacao.data.getFullYear()
            && this.quantidade === negociacao.quantidade
            && this.valor === negociacao.valor;
    }

    get volume(): number {
        return this.quantidade * this.valor;
    }

    get data(): Date {
        const data = new Date(this._data.getTime());
        return this._data;
    }
}
