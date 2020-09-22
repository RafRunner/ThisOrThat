'use strict';

module.exports = {
  // comandos:
  usoIncorretoDoComando: (opcoes) => 'Incorrect command use!',
  erroAoAtualizarDadosServidor: (opcoes) => 'An error occurred updating server configurations!',

  // changeLocale:
  usoLocale: (opcoes) => `Use: ${opcoes.prefixo}cl new_language. Supported languages: ${opcoes.localesValidos}`,
  localesExistentes: (opcoes) => `Suported languages: ${opcoes.localesValidos}`,
  localeAtualizado: (opcoes) => 'Language updated!',
  mensagemLocaleAtualizado: (opcoes) => 'Language updated to: ' + opcoes.novoLocale,
  descricaoLocale: (opcoes) =>
    `Command used to change the bot's language. Supported languages: ${opcoes.localesValidos}.\nUse ${opcoes.prefixo}changeLocale new_language`,

  // deleteQuestion:
  usoDeleteQuestion: (opcoes) => `Use: ${opcoes.prefixo}dq question_id`,
  descricaoDeleteQuestion: (opcoes) =>
    `Command to delete a question. Must be followed by the question's id. To see the server´s questions and their ids use ${opcoes.prefixo}listQuestion.\nUse: ${opcoes.prefixo}dq question_id`,

  // help:
  comoUsarOBot: (opcoes) => 'How to use the bot: ',
  oQueEOThisOrThat: (opcoes) => 'What is ThisOrThat?',
  respostaOQueEOThisOrThat: (opcoes) =>
    'It´s a bot that offers a situation where the server´s members can choose one of two scenarios proposed by it´s questions!',
  comoFazerPergunta: (opcoes) => 'How can I make the bot ask a question?',
  respostaComoFazerPergunta: (opcoes) =>
    `Just use the command ${opcoes.prefixo}q, the bot will ask a question and you must vote by reaction with either 🅰️ or 🅱️, and after some time the bot will send a message with the results`,
  possoCriarPerguntas: (opcoes) => 'Can I create my own questions?',
  respostaCriarPergutnas: (opcoes) =>
    `Of Course! Just use the command ${opcoes.prefixo}nq. Be aware that this new question will only appear on this server. You can also only delete questions from this server.`,
  oQueMaisFazer: (opcoes) => 'What else can I do?',
  respostaOQueMaisFazer: (opcoes) => `For a complete list of all commands and their uses, use the command ${opcoes.prefixo}c`,

  // listQuestions:
  acumuladorPergunta: (opcoes) =>
    '**Id: ' + opcoes.pergunta.id + '** - Would you rather "' + opcoes.pergunta.opcao_um + '" or "' + opcoes.pergunta.opcao_dois + '"?\n\n',
  servidorSemPerguntas: (opcoes) => 'This server has not registered any questions yet!',
  cadastreNovasPerguntas: (opcoes) => 'Create new questions!',
  listagemPaginas: (opcoes) => `Questions of the server (page  ${opcoes.page + 1}/${opcoes.resposta.paginas}): `,
  descricaoListQuestions: (opcoes) => `Command to list all of a server's questions.`,

  // mode:
  usoMode: (opcoes) => `Use: ${opcoes.prefixo}m new_mode`,
  modosExistentes: (opcoes) => `Existing modes: ${opcoes.modos}`,
  modoInvalido: (opcoes) => 'Invalid mode!',
  modoAtualizado: (opcoes) => 'Mode updated!',
  mensagemModoAtualizado: (opcoes) => 'The bot´s mode has been updated to ' + opcoes.novoModo,
  descricaoMode: (opcoes) =>
    `Alters the bot's mode. There are 3 modes: normal (all questions are asked), server (only this server's questions are asked) and global (only global questions are asked).\nUse: ${opcoes.prefixo}mode new_mode`,

  // newQuestion:
  usoNewQuestion: (opcoes) => `Use: ${opcoes.prefixo}nq 1- first option 2- second option`,
  descricaoNewQuestion: (opcoes) =>
    `Command used to create a new question. The options must be written in one line and have a maximum of 255 characters.\nUso: ${opcoes.prefixo}newQuestion 1- first option 2- second option`,

  // question:
  usoQuestion: (opcoes) => `Use: ${opcoes.prefixo}q or ${opcoes.prefixo}q question_id`,
  vocePrefere: (opcoes) => 'Would you rather...',
  oResultadoFoi: (opcoes) => 'The Results were:',
  resultadoPergunta: (opcoes) =>
    `**${opcoes.pergunta.opcao_um}:** ${opcoes.votosUm} votes\n**${opcoes.pergunta.opcao_dois}**: ${opcoes.votosDois} votes\n\n` +
    `"${opcoes.pergunta.opcao_um}" has ${opcoes.novoTotalUm} total votes (${opcoes.porcentagemVotosUm}%) and "${opcoes.pergunta.opcao_dois}" has ${opcoes.novoTotalDois} (${opcoes.porcentagemVotosDois}%)`,
  descricaoQuestion: (opcoes) =>
    `A question will be asked with two options (🅰️ and 🅱️). React with one of these reactions to vote. Optional: add a question is after the command to choose a question`,

  // serverStatus:
  explicacaoSomenteServidor: (opcoes) => 'server, only this server´s questions will be asked',
  explicacaoSomenteGlobal: (opcoes) =>
    'global, only questions from the bot´s global repository will be asked, questions you created wont be asked unless when requested by their id',
  explicacaoNormal: (opcoes) =>
    'normal, all global questions + server questions will be asked, but your server´s questions may take awhile to appear!',
  tituloConfiguracoesServidor: (opcoes) => 'Server´s current configurations:',
  tituloTimeOut: (opcoes) => 'Time to vote on questions (timeout):',
  segundos: (opcoes) => ' seconds',
  tituloModo: (opcoes) => 'Mode (which questions are asked):',
  tituloLocale: (opcoes) => 'Language of the server (there´ll only be made global questions of this language):',
  descricaoServerStatus: (opcoes) => `Shows the server's current configurations`,

  // timeout:
  usoTimeout: (opcoes) => `Use: ${opcoes.prefixo}t time_in_seconds`,
  tempoAtualizado: (opcoes) => 'Timeout updated',
  mensagemTempoAtualizado: (opcoes) => 'Timeout has been updated to ' + opcoes.novoTempo[0] + ' seconds',
  descricaoTimeOut: (opcoes) =>
    `Alters the time (in seconds) you have to react to a question before it's results are shown.\nUse: ${opcoes.prefixo}timeOut time_in_seconds`,

  // PerguntaService:
  erroBuscarPerguntas: (opcoes) => 'An error has occurred fetching the questions...',
  perguntaNaoEncontrada: (opcoes) => 'Question not found!',
  erroBuscarPergunta: (opcoes) => 'An error has occurred fetching the question....',
  nenhumaPerguntaEncontrada: (opcoes) => 'No questions found! Create new questions or change the bot´s mode',
  limiteCaracteresPergunta: (opcoes) => 'Options must have a maximum of 255 characters!',
  perguntaCriadaComSucesso: (opcoes) => 'Questions created successfully! Id: ' + opcoes.id,
  perguntaJaCadastrada: (opcoes) => 'This question has already been created!',
  erroCriarPergunta: (opcoes) => 'An error has occurred creating the question...',
  perguntaNaoExiste: (opcoes) => 'This question does not exist or is not from this server!',
  perguntaDeletada: (opcoes) => 'Question deleted successfully!',
  erroDeletarPergunta: (opcoes) => 'An error has occurred deleting the question... Try again later!',

  // ServidorService:
  limitesTimeout: (opcoes) => 'The timeout time must be between 10 and 1800 seconds',
  servidorNaoCadastrado: (opcoes) => 'The server has not been registered! Try using this command again',
  servidorNaoExiste: (opcoes) => 'This server doen´t exist (There was a problem registering it, try again or report the error please)',

  // respostaHandler:
  comandosExistentes: (opcoes) => 'Existing commands:',
  avisoPrefixos: (opcoes) => '**All commands must be preceded by: "' + opcoes.prefixo + '"**',

  // util:
  erro: (opcoes) => '**Error**',
  sucesso: (opcoes) => '**Success**',
};
