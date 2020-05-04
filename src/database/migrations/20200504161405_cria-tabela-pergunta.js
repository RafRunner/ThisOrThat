exports.up = function(knex) {
  return knex.schema.createTable('pergunta', function(table) {
    table.increments();
    table.string('opcao_um').notNullable();
    table.string('opcao_dois').notNullable();
    table
      .integer('votos_opcao_um')
      .notNullable()
      .defaultTo(0);
    table
      .integer('votos_opcao_dois')
      .notNullable()
      .defaultTo(0);
    table
      .string('locale', 4)
      .notNullable()
      .defaultTo('pt-BR');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('pergunta');
};
