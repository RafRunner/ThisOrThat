'use strict';

module.exports = {
  // comandos:
  usoIncorretoDoComando: (opcoes) => 'Uso incorrecto del mando!',
  mensagemErro: (opcoes) => 'Mensaje: ' + opcoes.resultado.erro,
  erroAoAtualizarDadosServidor: (opcoes) => 'Error al actualizar datos del servidor!',

  // changeLocale:
  usoLocale: (opcoes) => `Uso: ${opcoes.prefixo}cl nuevo_idioma. Idiomas compatibles: ${opcoes.localesValidos}`,
  localesExistentes: (opcoes) => `Idiomas compatibles: ${opcoes.localesValidos}`,
  localeAtualizado: (opcoes) => 'Idioma actualizado!',
  mensagemLocaleAtualizado: (opcoes) => 'Idioma actualizado para: ' + opcoes.novoLocale,
  descricaoLocale: (opcoes) =>
    `Mando para cambiar el idioma del bot. Idiomas compatibles: ${opcoes.localesValidos}.\nUso: ${opcoes.prefixo}changeLocale nuevo_idioma`,

  // deleteQuestion:
  usoDeleteQuestion: (opcoes) => `Uso: ${opcoes.prefixo}dq id_de_la_pergunta`,
  descricaoDeleteQuestion: (opcoes) =>
    `Mando para eliminar una pregunta. Debe ser seguido del id de la pregunta. Para ver los ids y las preguntas utilice ${opcoes.prefixo}listQuestion.\nUso: ${opcoes.prefixo}deleteQuestion id_de_la_pregunta`,

  // help:
  comoUsarOBot: (opcoes) => 'Como utilizar el bot: ',
  oQueEOThisOrThat: (opcoes) => 'Qué es el ThisOrThat?',
  respostaOQueEOThisOrThat: (opcoes) =>
    'Él es un bot que ofrece situaciones donde las personas del servidor deben votar en un entre dos escenarios propuestos por preguntas hechas por él y luego informa los resultados!',
  comoFazerPergunta: (opcoes) => '¿Cómo consigo que el bot haga una pregunta?',
  respostaComoFazerPergunta: (opcoes) =>
    `Sólo tiene que utilizar el mando ${opcoes.prefixo}q, el bot hará una pregunta y tú debe votar a través de las reacciones 🅰️ o 🅱️, después de um tiempo el bot enviará un mensaje con los resultados`,
  possoCriarPerguntas: (opcoes) => 'Puedo crear mis propias preguntas?',
  respostaCriarPergutnas: (opcoes) =>
    `Por supuesto! Sólo tiene que utilizar el mando ${opcoes.prefixo}nq, pero esa pregunta sólo aparecerá en ese servidor. Tú también sólo puede eliminar y listar preguntas de ese servidor`,
  oQueMaisFazer: (opcoes) => 'Qué más puedo hacer?',
  respostaOQueMaisFazer: (opcoes) => `Para una lista completa de mandos y sus explicaciones, utilice el mando ${opcoes.prefixo}c`,

  // listQuestions:
  acumuladorPergunta: (opcoes) =>
    '**Id: ' + opcoes.pergunta.id + '** - Tú prefiere "' + opcoes.pergunta.opcao_um + '" o "' + opcoes.pergunta.opcao_dois + '"?\n\n',
  servidorSemPerguntas: (opcoes) => 'Ese servidor todavía no tiene ninguna pregunta registrada!',
  cadastreNovasPerguntas: (opcoes) => 'Registra nuevas preguntas!',
  listagemPaginas: (opcoes) => `Preguntas del servidor (página ${opcoes.page + 1}/${opcoes.resposta.paginas}): `,
  descricaoListQuestions: (opcoes) => `Mando para listar todas las preguntas de ese servidor.`,

  // mode:
  usoMode: (opcoes) => `Uso: ${opcoes.prefixo}m modo`,
  modosExistentes: (opcoes) => `Modos existentes: ${opcoes.modos}`,
  modoInvalido: (opcoes) => 'Modo inválido!',
  modoAtualizado: (opcoes) => 'Modo actualizado',
  mensagemModoAtualizado: (opcoes) => 'el modo del bot ha sido actualizado para ' + opcoes.novoModo,
  descricaoMode: (opcoes) =>
    `Cambia el modo del bot. Actualmente existe 3: normal (se hacen todas las preguntas), server (se hacen solamente preguntas del servidor) y global (se hacen solamente preguntas globais).\nUso: ${opcoes.prefixo}mode modo`,

  // newQuestion:
  usoNewQuestion: (opcoes) => `Uso: ${opcoes.prefixo}nq 1- primera opción 2- segunda opción`,
  descricaoNewQuestion: (opcoes) =>
    `Mando para crear una nueva pregunta. Las opciones deben estar escritas en una línea y con un máximo de 255 caracteres.\nUso: ${opcoes.prefixo}newQuestion 1- primera opción 2- segunda opción`,

  // question:
  usoQuestion: (opcoes) => `Uso: ${opcoes.prefixo}q o ${opcoes.prefixo}q id_de_la_pregunta`,
  vocePrefere: (opcoes) => 'Tú prefiere...',
  oResultadoFoi: (opcoes) => 'El Resultado fue:',
  resultadoPergunta: (opcoes) =>
    `**${opcoes.pergunta.opcao_um}:** ${opcoes.votosUm} votos\n**${opcoes.pergunta.opcao_dois}**: ${opcoes.votosDois} votos\n\n` +
    `"${opcoes.pergunta.opcao_um}" Hay ${opcoes.novoTotalUm} votos en total (${opcoes.porcentagemVotosUm}%) y "${opcoes.pergunta.opcao_dois}" hay ${opcoes.novoTotalDois} (${opcoes.porcentagemVotosDois}%)`,
  descricaoQuestion: (opcoes) =>
    `Se hará una pregunta con dos opciones (🅰️ e 🅱️). Reacciona con una de estas opciones para votar. Opcional: añade el id de la pregunta después del mando para elegir una pregunta`,

  // serverStatus:
  explicacaoSomenteServidor: (opcoes) => 'server, se hacen solamente preguntas creadas en el servidor',
  explicacaoSomenteGlobal: (opcoes) =>
    'global, se hacen solamente preguntas desde el repositorio global del bot, las preguntas que creaste no son hechas a menos que lo solicite la id',
  explicacaoNormal: (opcoes) =>
    'normal, se hacen todas las preguntas globales + del servidor, pero los que creó en su servidor pueden tardar un tiempo en aparecer!',
  tituloConfiguracoesServidor: (opcoes) => 'Configuración actual del servidor:',
  tituloTimeOut: (opcoes) => 'Tiempo para responder a las preguntas (timeout):',
  segundos: (opcoes) => ' segundos',
  tituloModo: (opcoes) => 'Modo (qué preguntas se harán):',
  tituloLocale: (opcoes) => 'Idioma del servidor (solo se realizarán preguntas globales de este idioma):',
  descricaoServerStatus: (opcoes) => `muestra la configuración actual del bot en el servidor`,

  // timeout:
  usoTimeout: (opcoes) => `Uso: ${opcoes.prefixo}t tiempo_en_segundos`,
  tempoAtualizado: (opcoes) => 'Tiempo actualizado',
  mensagemTempoAtualizado: (opcoes) => 'El tiempo para responder fue actualizado para ' + opcoes.novoTempo[0] + ' segundos',
  descricaoTimeOut: (opcoes) =>
    `Cambiar por cuanto tiempo (en segundos) se puede responder una pregunta antes que se muestren los resultados.\nUso: ${opcoes.prefixo}timeOut tiempo_en_segundos`,

  // PerguntaService:
  erroBuscarPerguntas: (opcoes) => 'Se Ocorrió un error al obtener las preguntas...',
  perguntaNaoEncontrada: (opcoes) => 'Pregunta no encontrada!',
  erroBuscarPergunta: (opcoes) => 'Se Ocorrió un error al obtener las preguntas...',
  nenhumaPerguntaEncontrada: (opcoes) => 'No se encontraron preguntas! Registra una pregunta o cambie el modo del bot',
  limiteCaracteresPergunta: (opcoes) => 'Las opciones deben tener un máximo de 255 caracteres.',
  perguntaCriadaComSucesso: (opcoes) => 'Pregunta creada con éxito! Id: ' + opcoes.id,
  perguntaJaCadastrada: (opcoes) => 'Esa pregunta yá está registrada!',
  erroCriarPergunta: (opcoes) => 'Se Ocorrió un error al crear la pregunta...',
  perguntaNaoExiste: (opcoes) => 'Esa pregunta no existe o no es de ese servidor!',
  perguntaDeletada: (opcoes) => 'Pregunta eliminada con éxito!',
  erroDeletarPergunta: (opcoes) => 'Se Ocorrió un error al eliminar la pregunta... Intenta nuevamente más tarde!',

  // ServidorService:
  limitesTimeout: (opcoes) => 'El tiempo de timeout debe estar entre 10 y 1800 segundos',
  servidorNaoCadastrado: (opcoes) => 'El servidor no fue registrado! Intenta nuevamente',
  servidorNaoExiste: (opcoes) => 'Ese servidor no existe!',

  // respostaHandler:
  comandosExistentes: (opcoes) => 'Mandos existentes:',
  avisoPrefixos: (opcoes) => '**Todos los mandos deben estar precedidos del prefijo: "' + opcoes.prefixo + '"**',

  // util:
  erro: (opcoes) => '**Error**',
  sucesso: (opcoes) => '**Éxito**',
};
