import { Knex } from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable("filme_diretor_pessoa", table => {
        table.primary(["filmeId","pessoaId"]);
        table.integer("filmeId",10).unsigned().references("id").inTable("filme");
        table.integer("pessoaId",10).unsigned().references("id").inTable("pessoa");

    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable("filme_diretor_pessoa");
}
