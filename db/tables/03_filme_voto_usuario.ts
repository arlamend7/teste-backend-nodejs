import { Knex } from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable("filme_voto_usuario", table => {
        table.primary(["filmeId","usuarioId"]);
        table.integer("filmeId",10).unsigned().references("id").inTable("filme");
        table.integer("usuarioId",10).unsigned().references("id").inTable("usuario");
        table.integer("nota").notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable("filme_voto_usuario");
}
