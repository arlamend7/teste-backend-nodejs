import { Knex } from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable("filme", table => {
        table.increments("id",{primaryKey : true});
        table.string("titulo", 300).notNullable();
        table.string("videoUrl", 500).notNullable();
        table.string("imagemUrl", 500).notNullable();
        table.string("tituloDescricao", 500);
        table.string("descricao", 2000);
        table.date("dataPublicacao").notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable("filme");
}
