'use strict';

const connection = require('../database/connection');
const locale = require('../locale/locale');

function buildRandomQuestionQuerry(servidor) {
  let querry = connection('pergunta').where((querry) =>
    querry.where('locale', servidor.locale).orWhereNull('locale')
  );

  if (servidor.somente_perguntas_globais) {
    querry = querry.whereNull('id_servidor');
  } else {
    querry = querry.where((querry) => {
      querry.where('id_servidor', servidor.id_servidor);

      if (!servidor.somente_perguntas_servidor) {
        querry = querry.orWhereNull('id_servidor');
      }
    });
  }

  return querry;
}

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
    } catch (e) {
      console.error('Erro ao buscar perguntas paginadas:\n', e);
      return { sucesso: false, mensagem: locale.erroBuscarPerguntas };
    }
  },

  async get(id, id_servidor) {
    try {
      const pergunta = await connection('pergunta').where({ id, id_servidor }).first();

      return pergunta
        ? { sucesso: true, pergunta }
        : { sucesso: false, mensagem: locale.perguntaNaoEncontrada };
    } catch (e) {
      console.error('Eror ao buscar pergunta pelo id:\n', e);
      return { sucesso: false, mensagem: locale.erroBuscarPergunta };
    }
  },

  async getRandonQuestion(servidor) {
    try {
      let count = await buildRandomQuestionQuerry(servidor).count().first();
      count = count['count(*)'];
      if (count === 0) {
        return { sucesso: false, mensagem: locale.nenhumaPerguntaEncontrada };
      }

      const numeroSelecionado = Math.floor(Math.random() * count);

      const pergunta = await buildRandomQuestionQuerry(servidor)
        .orderBy('id')
        .offset(numeroSelecionado)
        .first();

      return { sucesso: true, pergunta };
    } catch (e) {
      console.error('Erro ao buscar pergunta aleatórioa:\n', e);
      return { sucesso: false, mensagem: locale.erroBuscarPerguntas };
    }
  },

  async create(primeiraOpcao, segundaOpcao, id_servidor, loc) {
    if (primeiraOpcao.length > 255 || segundaOpcao.length > 255) {
      return { sucesso: false, mensagem: locale.limiteCaracteresPergunta };
    }

    try {
      const [id] = await connection('pergunta').insert({
        opcao_um: primeiraOpcao,
        opcao_dois: segundaOpcao,
        id_servidor,
        locale: loc,
      });

      return { sucesso: true, mensagem: locale.perguntaCriadaComSucesso, id };
    } catch (e) {
      console.error('Erro ao criar pergunta:', e);
      const mensagem =
        e.code === 'SQLITE_CONSTRAINT' ? locale.perguntaJaCadastrada : locale.erroCriarPergunta;
      return { sucesso: false, mensagem };
    }
  },

  async updateVotos(pergunta, novoTotalUm, novoTotalDois) {
    try {
      await connection('pergunta').where('id', pergunta.id).update({
        votos_opcao_um: novoTotalUm,
        votos_opcao_dois: novoTotalDois,
      });

      return { sucesso: true };
    } catch (e) {
      console.error('Erro ao atualizar resultados da pergunta:\n', e);
      return { sucesso: false };
    }
  },

  async delete(id, id_servidor) {
    try {
      const perguntaDeletada = await connection('pergunta').where({ id, id_servidor }).delete();

      return perguntaDeletada
        ? { sucesso: true, mensagem: locale.perguntaDeletada }
        : { sucesso: false, mensagem: locale.perguntaNaoExiste };
    } catch (e) {
      console.error('Erro ao deletar pergunta', e);
      return { sucesso: false, mensagem: locale.erroDeletarPergunta };
    }
  },
};
