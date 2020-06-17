exports.up = function (knex) {
  return knex.schema.alterTable('servidores', function (table) {
    table.string('locale', 5).notNullable().defaultTo('en-US');
  });
};

exports.down = function (knex) {
  knex.schema.alterTable('servidores', function (table) {
    table.dropColumn('locale');
  });
};
