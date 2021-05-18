import { Knex } from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable("pessoa", table => {
        table.increments("id", {primaryKey : true});
        table.string("nome", 200).notNullable();
        table.string("imagemUrl", 500).notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable("pessoa");
}
