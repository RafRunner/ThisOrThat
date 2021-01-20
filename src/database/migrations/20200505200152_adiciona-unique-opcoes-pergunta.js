exports.up = function (knex) {
  return knex.schema.alterTable('pergunta', function (table) {
    //table.unique(['opcao_um', 'opcao_dois']);
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('pergunta', function (table) {
    //table.dropUnique(['opcao_um', 'opcao_dois']);
  });
};
