import { Filme } from "../models/filmes/filme";
import { Pessoa } from "../models/filmes/pessoa";
import { Usuario } from "../models/usuarios/usuario";
import knex from "../config/connection";
import pessoasService from "./pessoas.service";

class FilmeService {
    async listar(
        nomeDiretor: string,
        nome: string,
        genero: string,
        autor: string,
        qt: number,
        pg: number
    ): Promise<{ count: number; registros: Filme[] }> {
        pg = pg ?? 0;
        qt = qt ?? 10;

        let query = knex("filme").select("*");
        if (nome) {
            query = query.where("nome", "like", `%${nome}%`);
        }
        if (genero) {
            query = query.whereExists(
                knex("filme_genero")
                    .whereRaw("filme.id = filme_genero.filmeId")
                    .where("genero", "like", `%${genero}%`)
            );
        }
        if (nomeDiretor) {
            query = query.whereExists(
                knex("filme_diretor_pessoa")
                    .join("pessoa", "id", "=", "pessoaId")
                    .whereRaw("filme.id = filme_diretor_pessoa.filmeId")
                    .where("pessoa.nome", "like", `%${nomeDiretor}%`)
            );
        }
        if (autor) {
            query = query.whereExists(
                knex("filme_ator_pessoa")
                    .join("pessoa", "id", "=", "pessoaId")
                    .whereRaw("filme.id = filme_ator_pessoa.filmeId")
                    .where("pessoa.nome", "like", `%${autor}%`)
            );
        }

        return {
            count: (await query.clone().count("id").first())["count(`id`)"] as number,
            registros: (await query.offset(pg * qt).limit(qt)) ?? []
        };
    }
    async validar(id: number): Promise<Filme> {
        const filme = await knex("filme").select("*").where("id", "=", id).first();
        if (!filme) {
            throw new Error("Filme não encontrado");
        }
        return filme;
    }
    /**
     * Completa o registro com os detalhes (autores, diretores, generos, votos)
     * @param filme entindade que será recuperada os detalhes
     */
    async recuperarDetalhes(filme: Filme) {
        filme.generos = (await knex("filme_genero")
            .where("filmeId", filme.id)
            .select("genero")).map(x => x.genero);
        filme.atores = await knex("filme_ator_pessoa")
            .join("pessoa", "id", "=", "pessoaId")
            .where("filmeId", filme.id)
            .select("pessoa.*");
        filme.diretores = await knex("filme_diretor_pessoa")
            .join("pessoa", "id", "=", "pessoaId")
            .where("filmeId", filme.id)
            .select("pessoa.*");
        filme.notaMedia = (await knex("filme_voto_usuario")
            .where("filmeId", filme.id)
            .avg("nota").first())["avg(`nota`)"];
        return filme;
    }
    async votar(id: number, nota: number, usuario: Usuario) {
        this.validar(id);
        const votoUsuario = await knex("filme_voto_usuario")
            .where("filmeId", "=", id)
            .where("usuarioId", "=", usuario.id).first();

        if (!nota) {
            throw new Error("Nota Obrigatória");
        } else if (nota < 0 || nota > 4) {
            throw new Error("Nota inválida, o valor deve ser entre 0 e 4");
        }

        const transaction = await knex.transaction();
        try {            
            if (votoUsuario) {
                await transaction("filme_voto_usuario")
                    .where("filmeId", "=", id)
                    .where("usuarioId", "=", usuario.id)
                    .update({
                        nota
                    });
            } else {
                await transaction("filme_voto_usuario").insert({
                    filmeId: id,
                    usuarioId: usuario.id,
                    nota
                });
            }
            transaction.commit();
        } catch (e) {
            transaction.rollback();
            throw e;
        }
    }
    async criar(
        titulo: string,
        videoUrl: string,
        imagemUrl: string,
        tituloDescricao: string,
        descricao: string,
        autores: Pessoa[],
        diretores: Pessoa[],
        generos: string[]
    ): Promise<Filme> {
        const filme = new Filme({
            titulo,
            videoUrl,
            imagemUrl,
            tituloDescricao,
            descricao
        });
        const transaction = await knex.transaction();
        try {
            const [id] = await transaction("filme").insert(filme);
            filme.id = id;
            let pessoa: Pessoa;

            // * adiciona generos
            for await (const genero of generos) {
                await transaction("filme_genero").insert({
                    filmeId: id,
                    genero
                });
            }

            // * adiciona autores
            for await (const autor of autores) {
                pessoa = await pessoasService.getOrAdd(autor.nome, autor.imagemUrl);
                await transaction("filme_ator_pessoa").insert({
                    filmeId: id,
                    pessoaId: pessoa.id
                });
            }

            // * adiciona diretores
            for await (const diretor of diretores) {
                pessoa = await pessoasService.getOrAdd(diretor.nome, diretor.imagemUrl);
                await transaction("filme_diretor_pessoa").insert({
                    filmeId: id,
                    pessoaId: pessoa.id
                });
            }
        } catch (e) {
            transaction.rollback();
            throw e;
        }
        transaction.commit();

        return filme;
    }
}
export default new FilmeService();
