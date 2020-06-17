exports.up = function (knex) {
  return knex.schema
    .alterTable('pergunta', (table) => {
      table.dropColumn('locale');
    })
    .alterTable('pergunta', (table) => {
      table.string('locale', 5);
    });
};

exports.down = function (knex) {
  return knex.schema
    .alterTable('pergunta', (table) => {
      table.dropColumn('locale');
    })
    .alterTable('pergunta', (table) => {
      table.string('locale', 5).notNullable().defaultTo('pt-BR');
    });
};
