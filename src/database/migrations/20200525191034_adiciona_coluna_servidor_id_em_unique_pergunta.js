exports.up = function (knex) {
  return knex.schema.alterTable('pergunta', function (table) {
    table.dropUnique(['opcao_um', 'opcao_dois']);
    table.unique(['opcao_um', 'opcao_dois', 'id_servidor']);
  });
};

exports.down = function (knex) {
  knex.schema.alterTable('pergunta', function (table) {
    table.dropUnique(['opcao_um', 'opcao_dois', 'id_servidor']);
    table.unique(['opcao_um', 'opcao_dois']);
  });
};
