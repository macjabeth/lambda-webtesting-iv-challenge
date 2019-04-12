exports.up = function(knex) {
  return knex.schema.createTable('toilet', dumps => {
    dumps.increments();
    dumps.string('shape').notNullable();
    dumps.string('colour').notNullable();
    dumps.string('smells').notNullable();
    dumps.boolean('bloody').defaultTo(false);
    dumps.timestamp('plopped_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('toilet');
};
