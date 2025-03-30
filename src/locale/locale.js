'use strict';

const pt_BR = require('./pt-BR');
const en_US = require('./en-US');
const es_MX = require('./es-MX');

const defaultLocale = 'en-US';

const suportedLocales = new Map([
  ['pt-BR', pt_BR],
  ['en-US', en_US],
  ['es-MX', es_MX],
]);

function getVersaoCorreta(locale, nomeString, opcoes) {
  locale = locale || defaultLocale;
  const localeCorreto = suportedLocales.get(locale);
  return localeCorreto[nomeString](opcoes);
}

module.exports = {
  // comandos:
  usoIncorretoDoComando: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'usoIncorretoDoComando', opcoes),
  erroAoAtualizarDadosServidor: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'erroAoAtualizarDadosServidor', opcoes),

  // changeLocale:
  usoLocale: (locale, opcoes = null) => getVersaoCorreta(locale, 'usoLocale', opcoes),
  localesExistentes: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'localesExistentes', opcoes),
  localeAtualizado: (locale, opcoes = null) => getVersaoCorreta(locale, 'localeAtualizado', opcoes),
  mensagemLocaleAtualizado: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'mensagemLocaleAtualizado', opcoes),
  descricaoLocale: (locale, opcoes = null) => getVersaoCorreta(locale, 'descricaoLocale', opcoes),

  // deleteQuestion:
  usoDeleteQuestion: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'usoDeleteQuestion', opcoes),
  descricaoDeleteQuestion: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'descricaoDeleteQuestion', opcoes),

  // help:
  comoUsarOBot: (locale, opcoes = null) => getVersaoCorreta(locale, 'comoUsarOBot', opcoes),
  oQueEOThisOrThat: (locale, opcoes = null) => getVersaoCorreta(locale, 'oQueEOThisOrThat', opcoes),
  respostaOQueEOThisOrThat: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'respostaOQueEOThisOrThat', opcoes),
  comoFazerPergunta: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'comoFazerPergunta', opcoes),
  respostaComoFazerPergunta: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'respostaComoFazerPergunta', opcoes),
  possoCriarPerguntas: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'possoCriarPerguntas', opcoes),
  respostaCriarPergutnas: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'respostaCriarPergutnas', opcoes),
  oQueMaisFazer: (locale, opcoes = null) => getVersaoCorreta(locale, 'oQueMaisFazer', opcoes),
  respostaOQueMaisFazer: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'respostaOQueMaisFazer', opcoes),

  // listQuestions:
  acumuladorPergunta: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'acumuladorPergunta', opcoes),
  servidorSemPerguntas: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'servidorSemPerguntas', opcoes),
  cadastreNovasPerguntas: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'cadastreNovasPerguntas', opcoes),
  listagemPaginas: (locale, opcoes = null) => getVersaoCorreta(locale, 'listagemPaginas', opcoes),
  descricaoListQuestions: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'descricaoListQuestions', opcoes),

  // mode:
  usoMode: (locale, opcoes = null) => getVersaoCorreta(locale, 'usoMode', opcoes),
  modosExistentes: (locale, opcoes = null) => getVersaoCorreta(locale, 'modosExistentes', opcoes),
  modoInvalido: (locale, opcoes = null) => getVersaoCorreta(locale, 'modoInvalido', opcoes),
  modoAtualizado: (locale, opcoes = null) => getVersaoCorreta(locale, 'modoAtualizado', opcoes),
  mensagemModoAtualizado: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'mensagemModoAtualizado', opcoes),
  descricaoMode: (locale, opcoes = null) => getVersaoCorreta(locale, 'descricaoMode', opcoes),

  // newQuestion:
  usoNewQuestion: (locale, opcoes = null) => getVersaoCorreta(locale, 'usoNewQuestion', opcoes),
  descricaoNewQuestion: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'descricaoNewQuestion', opcoes),

  // question:
  usoQuestion: (locale, opcoes = null) => getVersaoCorreta(locale, 'usoQuestion', opcoes),
  vocePrefere: (locale, opcoes = null) => getVersaoCorreta(locale, 'vocePrefere', opcoes),
  oResultadoFoi: (locale, opcoes = null) => getVersaoCorreta(locale, 'oResultadoFoi', opcoes),
  resultadoPergunta: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'resultadoPergunta', opcoes),
  descricaoQuestion: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'descricaoQuestion', opcoes),

  // serverStatus:
  explicacaoSomenteServidor: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'explicacaoSomenteServidor', opcoes),
  explicacaoSomenteGlobal: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'explicacaoSomenteGlobal', opcoes),
  explicacaoNormal: (locale, opcoes = null) => getVersaoCorreta(locale, 'explicacaoNormal', opcoes),
  tituloConfiguracoesServidor: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'tituloConfiguracoesServidor', opcoes),
  tituloTimeOut: (locale, opcoes = null) => getVersaoCorreta(locale, 'tituloTimeOut', opcoes),
  segundos: (locale, opcoes = null) => getVersaoCorreta(locale, 'segundos', opcoes),
  tituloModo: (locale, opcoes = null) => getVersaoCorreta(locale, 'tituloModo', opcoes),
  tituloLocale: (locale, opcoes = null) => getVersaoCorreta(locale, 'tituloLocale', opcoes),
  descricaoServerStatus: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'descricaoServerStatus', opcoes),

  // timeout:
  usoTimeout: (locale, opcoes = null) => getVersaoCorreta(locale, 'usoTimeout', opcoes),
  tempoAtualizado: (locale, opcoes = null) => getVersaoCorreta(locale, 'tempoAtualizado', opcoes),
  mensagemTempoAtualizado: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'mensagemTempoAtualizado', opcoes),
  descricaoTimeOut: (locale, opcoes = null) => getVersaoCorreta(locale, 'descricaoTimeOut', opcoes),

  // PerguntaService:
  erroBuscarPerguntas: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'erroBuscarPerguntas', opcoes),
  perguntaNaoEncontrada: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'perguntaNaoEncontrada', opcoes),
  erroBuscarPergunta: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'erroBuscarPergunta', opcoes),
  nenhumaPerguntaEncontrada: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'nenhumaPerguntaEncontrada', opcoes),
  limiteCaracteresPergunta: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'limiteCaracteresPergunta', opcoes),
  perguntaCriadaComSucesso: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'perguntaCriadaComSucesso', opcoes),
  perguntaJaCadastrada: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'perguntaJaCadastrada', opcoes),
  erroCriarPergunta: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'erroCriarPergunta', opcoes),
  perguntaNaoExiste: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'perguntaNaoExiste', opcoes),
  perguntaDeletada: (locale, opcoes = null) => getVersaoCorreta(locale, 'perguntaDeletada', opcoes),
  erroDeletarPergunta: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'erroDeletarPergunta', opcoes),

  // ServidorService:
  limitesTimeout: (locale, opcoes = null) => getVersaoCorreta(locale, 'limitesTimeout', opcoes),
  servidorNaoCadastrado: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'servidorNaoCadastrado', opcoes),
  servidorNaoExiste: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'servidorNaoExiste', opcoes),

  // respostaHandler:
  comandosExistentes: (locale, opcoes = null) =>
    getVersaoCorreta(locale, 'comandosExistentes', opcoes),
  avisoPrefixos: (locale, opcoes = null) => getVersaoCorreta(locale, 'avisoPrefixos', opcoes),

  // util:
  erro: (locale, opcoes = null) => getVersaoCorreta(locale, 'erro', opcoes),
  sucesso: (locale, opcoes = null) => getVersaoCorreta(locale, 'sucesso', opcoes),

  suportedLocales,
  defaultLocale,
};
