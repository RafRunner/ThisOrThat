exports.up = function (knex) {
  return knex.schema
    .alterTable('pergunta', (table) => {
      table.string('id_servidor');
      table.foreign('id_servidor').references('id_servidor').inTable('servidores').onDelete('CASCADE').onUpdate('CASCADE');

      table.dropColumn('locale');
    })
    .alterTable('pergunta', (table) => {
      table.string('locale', 5).notNullable().defaultTo('pt-BR');
    });
};

exports.down = function (knex) {
  return knex.schema
    .alterTable('pergunta', (table) => {
      table.dropForeign('id_servidor');
      table.dropColumn('locale');
    })
    .alterTable('pergunta', (table) => {
      table.string('locale', 4).notNullable().defaultTo('pt-BR');
      table.dropColumn('id_servidor');
    });
};
