'use strict';

const connection = require('../database/connection');
const knex = require('knex');

module.exports = {
  // TODO No futuro deve retornar somente as perguntas do servidor (provavelmetne com paginação)
  async index() {
    try {
      const perguntas = await connection('pergunta').select('*');

      return { sucesso: true, perguntas: perguntas };
    } catch {
      return { sucesso: false, mensagem: 'Ocorreu um erro ao buscar as perguntas...' };
    }
  },

  async get(id) {
    try {
      const pergunta = await connection('pergunta').where('id', id).first();

      return { sucesso: true, pergunta: pergunta };
    } catch {
      return { sucesso: false, mensagem: 'Ocorreu um erro ao buscar as perguntas...' };
    }
  },

  async getRandonQuestion() {
    try {
      const [count] = await connection('pergunta').count();
      const numeroSelecionado = Math.floor(Math.random() * count['count(*)']);

      const perguntaSelecionada = await connection('pergunta').orderBy('id').offset(numeroSelecionado).first();

      return { sucesso: true, pergunta: perguntaSelecionada };
    } catch {
      return { sucesso: false, mensagem: 'Ocorreu um erro ao buscar as perguntas...' };
    }
  },

  async create(primeiraOpcao, segundaOpcao) {
    if (primeiraOpcao.length > 255 || segundaOpcao.length > 255) {
      return { sucesso: false, mensagem: 'As opções devem ter no máximo 255 caracteres!' };
    }

    try {
      const [id] = await connection('pergunta').insert({
        opcao_um: primeiraOpcao,
        opcao_dois: segundaOpcao,
      });

      return { sucesso: true, mensagem: 'Pergunta criada com sucesso! Id: ' + id };
    } catch (e) {
      const mensagem = e.code === 'SQLITE_CONSTRAINT' ? 'Essa pergunta já está cadastrada!' : 'Ocorreu um erro ao salvar a pergunta...';
      return { sucesso: false, mensagem: mensagem };
    }
  },

  async updateVotos(pergunta, novoTotalUm, novoTotalDois) {
    try {
      await connection('pergunta').where('id', pergunta.id).update({
        votos_opcao_um: novoTotalUm,
        votos_opcao_dois: novoTotalDois,
      });

      return { sucesso: true, mensagem: 'Pegunta atualizada com sucesso!' };
    } catch {
      return { sucesso: false, mensagem: 'Ocorreu um erro ao atualizar a pergunta...' };
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
