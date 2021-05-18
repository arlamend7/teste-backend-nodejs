import { Knex } from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable("filme_genero", table => {
        table.increments("id", {primaryKey : true});
        table.integer("filmeId",10).unsigned().references("id").inTable("filme");
        table.string("genero",100).notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable("filme_genero");
}
