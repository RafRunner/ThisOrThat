'use strict';

const connection = require('../database/connection');

module.exports = {
  // Aqui puramente por motivos de debug. TODO deletar mais tarde
  async index() {
    try {
      const perguntas = await connection('pergunta').select('*');

      return { sucesso: true, perguntas: perguntas };
    } catch {
      return { sucesso: false, mensagem: 'Ocorreu um erro ao buscar as perguntas...' };
    }
  },

  async create(primeiraOpcao, segundaOpcao) {
    if (primeiraOpcao.length > 255 || segundaOpcao.length > 255) {
      return { sucesso: false, mensagem: 'As opções devem ter no máximo 255 caracteres!' };
    }

    try {
      await connection('pergunta').insert({
        opcao_um: primeiraOpcao,
        opcao_dois: segundaOpcao
      });

      return { sucesso: true, mensagem: 'Pergunta criada com sucesso!' };
    } catch {
      return { sucesso: false, mensagem: 'Ocorreu um erro ao salvar a pergunta... Tente novamente mais tarde!' };
    }
  }
};
