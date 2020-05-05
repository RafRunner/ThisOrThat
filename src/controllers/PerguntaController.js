'use strict';

const connection = require('../database/connection');

module.exports = {
  // TODO No futuro deve retornar somente as perguntas do servidor
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
        opcao_dois: segundaOpcao,
      });

      return { sucesso: true, mensagem: 'Pergunta criada com sucesso!' };
    } catch {
      return { sucesso: false, mensagem: 'Ocorreu um erro ao salvar a pergunta... Tente novamente mais tarde!' };
    }
  },

  async delete(id) {
    try {
      const pergunta = await connection('pergunta').where('id', id).select('id').first();
      if (!pergunta) {
        return { sucesso: false, mensagem: 'Essa pergunta não existe!' };
      }

      await connection('pergunta').where('id', id).delete();

      return { sucesso: true, mensagem: 'Pergunta deletada com sucesso!' };
    } catch {
      return { sucesso: false, mensagem: 'Ocorreu um erro ao deletar a pergunta... Tente novamente mais tarde!' };
    }
  },
};
