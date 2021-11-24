var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NegociacaoView } from './../views/negociacoes-view.js';
import { Negociacoes } from "../models/negociacoes.js";
import { Negociacao } from "./../models/negociacao.js";
import { MensagemView } from '../views/mensagem-view.js';
import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { domInjector } from '../decorators/dom-injector.js';
import { NegociacaoService } from '../services/negociacoes-services.js';
import { imprimir } from '../utils/imprimir.js';
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacaoView = new NegociacaoView("#negociacoesView");
        this.mensagemView = new MensagemView("#mensagemView");
        this.negociacoesService = new NegociacaoService();
        this.negociacaoView.update(this.negociacoes);
    }
    adiciona() {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update('Apenas negociações em dias uteis são aceitas');
            return;
        }
        this.negociacoes.adiciona(negociacao);
        imprimir(negociacao, this.negociacoes);
        this.limpaFormulario();
        this.atualizaView();
    }
    importaDados() {
        this.negociacoesService
            .obterNegociacoesDoDia()
            .then(negociacoeDeHoje => {
            return negociacoeDeHoje.filter(negociacoeDeHoje => {
                return !this.negociacoes
                    .lista()
                    .some(Negociacao => Negociacao
                    .ehIgual(negociacoeDeHoje));
            });
        })
            .then(negociacoesDeHoje => {
            for (let negociacao of negociacoesDeHoje) {
                this.negociacoes.adiciona(negociacao);
            }
            this.negociacaoView.update(this.negociacoes);
        });
    }
    limpaFormulario() {
        this.inputData.value = "";
        this.inputQuantidade.value = "";
        this.inputValor.value = "";
        this.inputData.focus();
    }
    atualizaView() {
        this.negociacaoView.update(this.negociacoes);
        this.mensagemView.update('Negociação adiconada com sucesso');
    }
    ehDiaUtil(data) {
        return data.getDay() > DiasDaSemana.DOMINGO
            && data.getDay() < DiasDaSemana.SABADO;
    }
}
__decorate([
    domInjector('#data')
], NegociacaoController.prototype, "inputData", void 0);
__decorate([
    domInjector('#quantidade')
], NegociacaoController.prototype, "inputQuantidade", void 0);
__decorate([
    domInjector('#valor')
], NegociacaoController.prototype, "inputValor", void 0);
//# sourceMappingURL=negociacao-controller.js.map