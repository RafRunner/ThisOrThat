'use strict';

const connection = require('../database/connection');
const locale = require('../locale/locale');

const servidorPadrao = {
  id: -1,
  id_servidor: 'padrao',
  tempo_para_responder: 90,
  somente_perguntas_servidor: 0,
  somente_perguntas_globais: 0,
  locale: locale.defaultLocale,
};

module.exports = {
  async get(id_servidor) {
    try {
      const servidor = await connection('servidores').where('id_servidor', id_servidor).select('*').first();

      return { sucesso: true, servidor };
    } catch (e) {
      console.log('Erro ao obter servidor:\n', e);
      return { sucesso: false };
    }
  },

  async exists(id_servidor) {
    try {
      const id = await connection('servidores').where('id_servidor', id_servidor).select('id').first();

      if (id) {
        return true;
      }
      return false;
    } catch (e) {
      console.log('Erro ao conferir existência de um servidor:\n', e);
      return false;
    }
  },

  async tentaCriarEObterOuPadrao(id_servidor) {
    if (!(await this.exists(id_servidor))) {
      await this.registrar(id_servidor);
    }

    const resultado = await this.get(id_servidor);
    if (!resultado.sucesso) {
      return this.getServidorPadrao();
    }
    return resultado.servidor;
  },

  async update(id_servidor, camposAlterados) {
    if (camposAlterados.tempo_para_responder && (camposAlterados.tempo_para_responder > 1800 || camposAlterados.tempo_para_responder < 10)) {
      return { sucesso: false, erro: locale.limitesTimeout };
    }
    try {
      if (!(await this.exists(id_servidor))) {
        return { sucesso: false, erro: (l) => locale.erroAtualizarServidor('en-US') };
      }
      await connection('servidores').where('id_servidor', id_servidor).update(camposAlterados);

      return { sucesso: true, erro: null };
    } catch (erro) {
      console.log('Erro ao atualizar servidor:\n', erro);
      return { sucesso: false, erro: (l) => erro.message };
    }
  },

  async create(id_servidor) {
    try {
      const [id] = await connection('servidores').insert({
        id_servidor,
      });

      return { sucesso: true };
    } catch (e) {
      const mensagem = e.code === 'SQLITE_CONSTRAINT' ? 'Essa servidor já está cadastrado!' : 'Ocorreu um erro ao cadastrar o servidor:';
      console.log(mensagem + '\n', e);
      return { sucesso: false };
    }
  },

  async registrar(id_servidor) {
    let resultado = await this.create(id_servidor);
    let tentativas = 1;

    console.log(`Tentando salvar servidor de id ${id_servidor} no banco de dados`);
    console.log('Tentativa de número ' + tentativas);
    console.log(resultado);

    while (!resultado.sucesso && tentativas < 11) {
      resultado = await this.create(id_servidor);
      console.log('Tentativa de número ' + tentativas);
      console.log(resultado);
      tentativas++;
    }

    return resultado.sucesso;
  },

  async getServidorPadrao() {
    return servidorPadrao;
  },

  async delete(id_servidor) {
    try {
      const servidor = await connection('servidores').where('id_servidor', id_servidor).select('id').first();
      if (!servidor) {
        return { sucesso: false, mensagem: locale.servidorNaoExiste('pt-BR') };
      }

      await connection('servidores').where('id', id).delete();

      return { sucesso: true, mensagem: 'Servidor deletado com suceeso' };
    } catch (e) {
      return { sucesso: false, mensagem: 'Erro ao deletar o servidor: ' + e.message };
    }
  },
};
