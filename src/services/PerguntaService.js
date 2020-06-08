'use strict';

const connection = require('../database/connection');

module.exports = {
  async getAllpaginado(page, id_servidor) {
    const pageSize = 10;

    try {
      const [count] = await connection('pergunta').where('id_servidor', id_servidor).count();

      const perguntas = await connection('pergunta')
        .where('id_servidor', id_servidor)
        .limit(pageSize)
        .offset(page * pageSize)
        .select('*');

      const paginas = Math.ceil(count['count(*)'] / pageSize);

      return { sucesso: true, perguntas, paginas };
    } catch {
      return { sucesso: false, mensagem: 'Ocorreu um erro ao buscar as perguntas...' };
    }
  },

  async get(id, id_servidor) {
    try {
      let pergunta = await connection('pergunta').where({ id, id_servidor }).first();

      if (pergunta) {
        return { sucesso: true, pergunta };
      }
      return { sucesso: false, mensagem: 'Pergunta não encontrada!' };
    } catch {
      return { sucesso: false, mensagem: 'Ocorreu um erro ao buscar a pergunta...' };
    }
  },

  async getRandonQuestion(servidor) {
    try {
      let count = connection('pergunta');
      if (servidor.somente_perguntas_globais) {
        count = count.whereNull('id_servidor');
      } else if (servidor.somente_perguntas_servidor) {
        count = count.where('id_servidor', servidor.id_servidor);
      }
      count = await count.count().first();
      count = count['count(*)'];
      if (count === 0) {
        return { sucesso: false, mensagem: 'Nenhuma pergunta encontrada! Cadastre uma pergunta ou mude o modo do bot' };
      }

      const numeroSelecionado = Math.floor(Math.random() * count);

      let pergunta = connection('pergunta');
      if (servidor.somente_perguntas_globais) {
        pergunta = pergunta.whereNull('id_servidor');
      } else if (servidor.somente_perguntas_servidor) {
        pergunta = pergunta.where('id_servidor', servidor.id_servidor);
      }
      pergunta = await pergunta.orderBy('id').offset(numeroSelecionado).first();

      return { sucesso: true, pergunta };
    } catch {
      return { sucesso: false, mensagem: 'Ocorreu um erro ao buscar as perguntas...' };
    }
  },

  async create(primeiraOpcao, segundaOpcao, id_servidor) {
    if (primeiraOpcao.length > 255 || segundaOpcao.length > 255) {
      return { sucesso: false, mensagem: 'As opções devem ter no máximo 255 caracteres!' };
    }

    try {
      const [id] = await connection('pergunta').insert({
        opcao_um: primeiraOpcao,
        opcao_dois: segundaOpcao,
        id_servidor: id_servidor,
      });

      return { sucesso: true, mensagem: 'Pergunta criada com sucesso! Id: ' + id };
    } catch (e) {
      const mensagem = e.code === 'SQLITE_CONSTRAINT' ? 'Essa pergunta já está cadastrada!' : 'Ocorreu um erro ao salvar a pergunta...';
      return { sucesso: false, mensagem };
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

  async delete(id, id_servidor) {
    try {
      const pergunta = await connection('pergunta').where({ id, id_servidor }).select('id').first();
      if (!pergunta) {
        return { sucesso: false, mensagem: 'Essa pergunta não existe ou não é desse servidor!' };
      }

      await connection('pergunta').where('id', id).delete();

      return { sucesso: true, mensagem: 'Pergunta deletada com sucesso!' };
    } catch {
      return { sucesso: false, mensagem: 'Ocorreu um erro ao deletar a pergunta... Tente novamente mais tarde!' };
    }
  },
};
