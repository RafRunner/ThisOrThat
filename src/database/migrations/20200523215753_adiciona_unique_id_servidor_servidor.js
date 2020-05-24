exports.up = function (knex) {
  return knex.schema.alterTable('servidores', function (table) {
    table.unique('id_servidor');
  });
};

exports.down = function (knex) {
  knex.schema.alterTable('servidores', function (table) {
    table.dropUnique('id_servidor');
  });
};
