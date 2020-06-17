'use-strict';

module.exports = {
  // comandos:
  usoIncorretoDoComando: (opcoes) => 'Uso incorreto do comando!',
  mensagemErro: (opcoes) => 'Mensagem: ' + opcoes.resultado.erro,
  erroAoAtualizarDadosServidor: (opcoes) => 'Erro ao atualizar dados do servidor!',

  // changeLocale:
  usoLocale: (opcoes) => `Uso: ${opcoes.prefixo}cl novo_idioma. Idiomas suportados: ${opcoes.localesValidos}`,
  localesExistentes: (opcoes) => `Idiomas suportados: ${opcoes.localesValidos}`,
  localeAtualizado: (opcoes) => 'Idioma atualizado!',
  mensagemLocaleAtualizado: (opcoes) => 'Idioma atualizado para: ' + opcoes.novoLocale,
  descricaoLocale: (opcoes) =>
    `Comando para mudar o idioma do bot. Idiomas suportados: ${opcoes.localesValidos}.\nUso: ${opcoes.prefixo}changeLocale novo_idioma`,

  // deleteQuestion:
  usoDeleteQuestion: (opcoes) => `Uso: ${opcoes.prefixo}dq id_da_pergunta`,
  descricaoDeleteQuestion: (opcoes) =>
    `Comando para deletar uma pergunta. Deve ser seguido do id da pergunta. Para ver os ids e as perguntas use ${opcoes.prefixo}listQuestion.\nUso: ${opcoes.prefixo}deleteQuestion id_da_pergunta`,

  // help:
  comoUsarOBot: (opcoes) => 'Como usar o bot: ',
  oQueEOThisOrThat: (opcoes) => 'O que é o ThisOrThat?',
  respostaOQueEOThisOrThat: (opcoes) =>
    'Ele é um bot que oferece situações onde as pessoas do servidor devem votar em um entre dois cenários propostos por perguntas feitas por ele e depois reporta os resultados!',
  comoFazerPergunta: (opcoes) => 'Como faço para o bot fazer um pergunta?',
  respostaComoFazerPergunta: (opcoes) =>
    `Basta usar o comando ${opcoes.prefixo}q, o bot fará uma pergunta e você deve votar através das reações 🅰️ ou 🅱️, depois de um tempo o bot irá enviar uma mensagem com os resultados`,
  possoCriarPerguntas: (opcoes) => 'Posso criar minhas própriar perguntas?',
  respostaCriarPergutnas: (opcoes) =>
    `Claro! Basta usar o comando ${opcoes.prefixo}nq, porém essa pergunta só irá aparecer nesse servidor. Você também só pode deletar e listar perguntas desse servidor`,
  oQueMaisFazer: (opcoes) => 'O que mais posso fazer?',
  respostaOQueMaisFazer: (opcoes) => `Para uma lista completa de comandos e suas explicações, use o comando ${opcoes.prefixo}c`,

  // listQuestions:
  acumuladorPergunta: (opcoes) =>
    '**Id: ' + opcoes.pergunta.id + '** - Você prefere "' + opcoes.pergunta.opcao_um + '" ou "' + opcoes.pergunta.opcao_dois + '"?\n\n',
  servidorSemPerguntas: (opcoes) => 'Esse servidor ainda não tem nenhuma pergunta cadastrada!',
  cadastreNovasPerguntas: (opcoes) => 'Cadastre novas perguntas!',
  listagemPaginas: (opcoes) => `Perguntas do servidor (página ${opcoes.page + 1}/${opcoes.resposta.paginas}): `,
  descricaoListQuestions: (opcoes) => `Comando para listar todas as perguntas desse servidor.`,

  // mode:
  usoMode: (opcoes) => `Uso: ${opcoes.prefixo}m modo`,
  modosExistentes: (opcoes) => `Modos existentes: ${opcoes.modos}`,
  modoInvalido: (opcoes) => 'Modo inválido!',
  modoAtualizado: (opcoes) => 'Modo atualizado',
  mensagemModoAtualizado: (opcoes) => 'O modo do bot foi atualizado para ' + opcoes.novoModo,
  descricaoMode: (opcoes) =>
    `Altera o modo do bot. Atualmente existem 3: normal (todas as perguntas são feitas), server (somente perguntas do servidor são feitas) e global (somente perguntas globais são feitas).\nUso: ${opcoes.prefixo}mode modo`,

  // newQuestion:
  usoNewQuestion: (opcoes) => `Uso: ${opcoes.prefixo}nq 1- primeira opção 2- segunda opção`,
  descricaoNewQuestion: (opcoes) =>
    `Comando para criar uma nova pergunta. As opções devem ser escritas em uma linha e no máximo 255 caracteres.\nUso: ${opcoes.prefixo}newQuestion 1- primeira opção 2- segunda opção`,

  // question:
  usoQuestion: (opcoes) => `Uso: ${opcoes.prefixo}q ou ${opcoes.prefixo}q id_da_pergunta`,
  vocePrefere: (opcoes) => 'Você prefere...',
  oResultadoFoi: (opcoes) => 'O Resultado foi:',
  resultadoPergunta: (opcoes) =>
    `**${opcoes.pergunta.opcao_um}:** ${opcoes.votosUm} votos\n**${opcoes.pergunta.opcao_dois}**: ${opcoes.votosDois} votos\n\n` +
    `"${opcoes.pergunta.opcao_um}" tem ${opcoes.novoTotalUm} votos no total (${opcoes.porcentagemVotosUm}%) e "${opcoes.pergunta.opcao_dois}" tem ${opcoes.novoTotalDois} (${opcoes.porcentagemVotosDois}%)`,
  descricaoQuestion: (opcoes) =>
    `Será feita uma pergunta com duas opções (🅰️ e 🅱️). Reaja com uma dessas opções para votar. Opcional: adicione o id da pergunta depois do comando para escolher uma pergunta`,

  // serverStatus:
  explicacaoSomenteServidor: (opcoes) => 'server, só serrão feitas perguntas criadas nesse servidor',
  explicacaoSomenteGlobal: (opcoes) =>
    'global, só serrão feitas perguntas do repositório global do bot, perguntas que você criou não são feitas a menos que pedidas pelo id',
  explicacaoNormal: (opcoes) =>
    'normal, todas as perguntas globais + do servidor serrão feitas, porém as que você criou no seu server podem demorar a aparecer!',
  tituloConfiguracoesServidor: (opcoes) => 'Configurações atuais do servidor:',
  tituloTimeOut: (opcoes) => 'Tempo para responder as perguntas (timeout):',
  segundos: (opcoes) => ' segundos',
  tituloModo: (opcoes) => 'Modo (quais perguntas serão feitas):',
  tituloLocale: (opcoes) => 'Idioma do servidor (serão feitas somente perguntas globais desse idioma):',
  descricaoServerStatus: (opcoes) => `Mostra as configurações atuais do bot no servidor`,

  // timeout:
  usoTimeout: (opcoes) => `Uso: ${opcoes.prefixo}t tempo_em_segundos`,
  tempoAtualizado: (opcoes) => 'Tempo atualizado',
  mensagemTempoAtualizado: (opcoes) => 'O tempo para responder foi atualizado para ' + opcoes.novoTempo[0] + ' segundos',
  descricaoTimeOut: (opcoes) =>
    `Altera por quanto tempo (em segundos) uma pergunta poderá ser respondida antes dos resultados serem mostrados.\nUso: ${opcoes.prefixo}timeOut tempo_em_segundos`,

  // PerguntaService:
  erroBuscarPerguntas: (opcoes) => 'Ocorreu um erro ao buscar as perguntas...',
  perguntaNaoEncontrada: (opcoes) => 'Pergunta não encontrada!',
  erroBuscarPergunta: (opcoes) => 'Ocorreu um erro ao buscar a pergunta...',
  nenhumaPerguntaEncontrada: (opcoes) => 'Nenhuma pergunta encontrada! Cadastre uma pergunta ou mude o modo do bot',
  limiteCaracteresPergunta: (opcoes) => 'As opções devem ter no máximo 255 caracteres!',
  perguntaCriadaComSucesso: (opcoes) => 'Pergunta criada com sucesso! Id: ' + opcoes.id,
  perguntaJaCadastrada: (opcoes) => 'Essa pergunta já está cadastrada!',
  erroCriarPergunta: (opcoes) => 'Ocorreu um erro ao criar a pergunta...',
  perguntaNaoExiste: (opcoes) => 'Essa pergunta não existe ou não é desse servidor!',
  perguntaDeletada: (opcoes) => 'Pergunta deletada com sucesso!',
  erroDeletarPergunta: (opcoes) => 'Ocorreu um erro ao deletar a pergunta... Tente novamente mais tarde!',

  // ServidorService:
  limitesTimeout: (opcoes) => 'O tempo de timeout deve estar entre 10 e 1800 segundos',
  servidorNaoCadastrado: (opcoes) => 'O servidor não foi cadastrado! Tente novamente',
  servidorNaoExiste: (opcoes) => 'Esse servidor não existe!',

  // respostaHandler:
  comandosExistentes: (opcoes) => 'Comandos existentes:',
  avisoPrefixos: (opcoes) => '**Todos os comando devem ser precedidos do prefixo: "' + opcoes.prefixo + '"**',

  // util:
  erro: (opcoes) => '**Erro**',
  sucesso: (opcoes) => '**Sucesso**',
};
