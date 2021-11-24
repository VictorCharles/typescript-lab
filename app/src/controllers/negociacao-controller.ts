import { NegociacaoView } from './../views/negociacoes-view.js';
import { Negociacoes } from "../models/negociacoes.js";
import { Negociacao } from "./../models/negociacao.js";
import { MensagemView } from '../views/mensagem-view.js';
import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { logarTempodeExecucao } from '../decorators/logar-tempo-de-exe.js';
import { inspect } from '../decorators/inspect.js';
import { domInjector } from '../decorators/dom-injector.js';
import { NegociacoesDoDia } from '../interfaces/negociacao-do-dia.js';
import { NegociacaoService } from '../services/negociacoes-services.js';
import { imprimir } from '../utils/imprimir.js';

export class NegociacaoController {
    @domInjector('#data')
    private inputData: HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;
    @domInjector('#valor')
    private inputValor: HTMLInputElement;
    private negociacoes: Negociacoes = new Negociacoes();
    private negociacaoView = new NegociacaoView("#negociacoesView");
    private mensagemView = new MensagemView("#mensagemView");
    private negociacoesService = new NegociacaoService();

    constructor() {
        this.negociacaoView.update(this.negociacoes);
    }

    //@logarTempodeExecucao()
    //@inspect()
    public adiciona(): void {
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update('Apenas negociações em dias uteis são aceitas')
            return;
        }
        this.negociacoes.adiciona(negociacao);
        imprimir(negociacao, this.negociacoes)
        this.limpaFormulario();
        this.atualizaView();
    }

    public importaDados(): void {
        this.negociacoesService
            .obterNegociacoesDoDia()
            .then(negociacoeDeHoje => {
                return negociacoeDeHoje.filter(negociacoeDeHoje => {
                    return !this.negociacoes
                        .lista()
                        .some(Negociacao => Negociacao
                            .ehIgual(negociacoeDeHoje))
                })
            })
            .then(negociacoesDeHoje => {
                for (let negociacao of negociacoesDeHoje) {
                    this.negociacoes.adiciona(negociacao);
                }
                this.negociacaoView.update(this.negociacoes)
            })
    }


    private limpaFormulario(): void {
        this.inputData.value = "";
        this.inputQuantidade.value = "";
        this.inputValor.value = "";
        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacaoView.update(this.negociacoes);
        this.mensagemView.update('Negociação adiconada com sucesso');
    }

    private ehDiaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.DOMINGO
            && data.getDay() < DiasDaSemana.SABADO;
    }
}
