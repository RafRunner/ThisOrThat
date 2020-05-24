exports.up = function (knex) {
  return knex.schema.createTable('servidores', (table) => {
    table.increments();
    table.string('id_servidor').notNullable();
    table.integer('tempo_para_responder').notNullable().defaultTo(90);
    table.boolean('somente_perguntas_servidor').notNullable().defaultTo(false);
    table.boolean('somente_perguntas_globais').notNullable().defaultTo(false);

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('servidores');
};
