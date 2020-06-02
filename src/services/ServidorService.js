'use strict';

const connection = require('../database/connection');

module.exports = {
  async get(id_servidor) {
    try {
      const servidor = await connection('servidores').where('id_servidor', id_servidor).select('*').first();

      return { sucesso: true, servidor };
    } catch {
      return { sucesso: false, mensagem: 'Ocorreu um erro ao buscar o servidor...' };
    }
  },

  async exists(id_servidor) {
    try {
      const id = await connection('servidores').where('id_servidor', id_servidor).select('id').first();

      if (id) {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  async tentaCriarEObterOuPadrao(id_servidor) {
    if (!(await this.exists(id_servidor))) {
      if (!(await this.registrar(id_servidor))) {
        return await this.getServidorPadrao();
      }
    }

    const resultado = await this.get(id_servidor);
    if (!resultado.sucesso) {
      return await this.getServidorPadrao();
    }
    return resultado.servidor;
  },

  async createIfNotExistsAndUpdate(id_servidor, camposAlterados) {
    if (camposAlterados.tempo_para_responder && (camposAlterados.tempo_para_responder > 1800 || camposAlterados.tempo_para_responder < 10)) {
      return { sucesso: false, erro: 'O tempo de timeout deve estar entre 10 e 1800 segundos' };
    }
    try {
      if (!(await this.exists(id_servidor))) {
        if (!(await this.registrar(id_servidor))) {
          return { sucesso: false, erro: 'Erro ao registrar o servidor' };
        }
      }
      await connection('servidores').where('id_servidor', id_servidor).update(camposAlterados);

      return { sucesso: true, erro: null };
    } catch (erro) {
      return { sucesso: false, erro: erro.message };
    }
  },

  async create(id_servidor) {
    try {
      const [id] = await connection('servidores').insert({
        id_servidor,
      });

      return { sucesso: true, mensagem: 'Servidor registrado com sucesso! Id: ' + id };
    } catch (e) {
      const mensagem =
        e.code === 'SQLITE_CONSTRAINT' ? 'Essa servidor já está cadastrado!' : 'Ocorreu um erro ao salvar o servidor... Erro: ' + e.message;
      return { sucesso: false, mensagem: mensagem };
    }
  },

  async registrar(id_servidor) {
    let resultado = await this.create(id_servidor);

    let tentativas = 1;
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
    return await this.get('padrao');
  },

  async delete(id_servidor) {
    try {
      const servidor = await connection('servidores').where('id_servidor', id_servidor).select('id').first();
      if (!servidor) {
        return { sucesso: false, mensagem: 'Esse servidor não existe!' };
      }

      await connection('servidores').where('id', id).delete();

      return { sucesso: true, mensagem: 'Servidor deletado com sucesso!' };
    } catch {
      return { sucesso: false, mensagem: 'Ocorreu um erro ao deletar o servidor... Tente novamente mais tarde!' };
    }
  },
};
