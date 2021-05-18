import { Knex } from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('usuario', table => {
        table.increments('id',{primaryKey : true});
        table.string('nome', 200).notNullable();
        table.string('email', 200).notNullable();
        table.string('senha',200).notNullable();
        table.boolean('ativo').notNullable();
        table.string('role');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('usuario');
}
