'use strict';

const connection = require('../database/connection');
const locale = require('../locale/locale');

function buildRandomQuestionQuerry(servidor) {
  let querry = connection('pergunta').where((querry) => querry.where('locale', servidor.locale).orWhereNull('locale'));
  if (servidor.somente_perguntas_globais) {
    querry = querry.whereNull('id_servidor');
  } else {
    querry = querry.andWhere((querry) => {
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
      console.log('Erro ao buscar perguntas paginadas:\n', e);
      return { sucesso: false, mensagem: locale.erroBuscarPerguntas };
    }
  },

  async get(id, id_servidor) {
    try {
      let pergunta = await connection('pergunta').where({ id, id_servidor }).first();

      if (pergunta) {
        return { sucesso: true, pergunta };
      }
      return { sucesso: false, mensagem: locale.perguntaNaoEncontrada };
    } catch (e) {
      console.log('Eror ao buscar pergunta pelo id:\n', e);
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

      const pergunta = await buildRandomQuestionQuerry(servidor).orderBy('id').offset(numeroSelecionado).first();

      return { sucesso: true, pergunta };
    } catch (e) {
      console.log('Erro ao buscar pergunta aleatórioa:\n', e);
      return { sucesso: false, mensagem: locale.erroBuscarPerguntas };
    }
  },

  async create(primeiraOpcao, segundaOpcao, id_servidor) {
    if (primeiraOpcao.length > 255 || segundaOpcao.length > 255) {
      return { sucesso: false, mensagem: locale.limiteCaracteresPergunta };
    }

    try {
      const [id] = await connection('pergunta').insert({
        opcao_um: primeiraOpcao,
        opcao_dois: segundaOpcao,
        id_servidor: id_servidor,
      });

      return { sucesso: true, mensagem: locale.perguntaCriadaComSucesso, id };
    } catch (e) {
      console.log('Erro ao criar pergunta:', e);
      const mensagem = e.code === 'SQLITE_CONSTRAINT' ? locale.perguntaJaCadastrada : locale.erroCriarPergunta;
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
      console.log('Erro ao atualizar resultados da pergunta:\n', e);
      return { sucesso: false };
    }
  },

  async delete(id, id_servidor) {
    try {
      const pergunta = await connection('pergunta').where({ id, id_servidor }).select('id').first();
      if (!pergunta) {
        return { sucesso: false, mensagem: locale.perguntaNaoExiste };
      }

      await connection('pergunta').where('id', id).delete();

      return { sucesso: true, mensagem: locale.perguntaDeletada };
    } catch (e) {
      console.log('Erro ao deletar pergunta', e);
      return { sucesso: false, mensagem: locale.erroDeletarPergunta };
    }
  },
};
