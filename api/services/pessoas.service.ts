import { Pessoa } from "../models/filmes/pessoa";
import knex from "../config/connection";

class PessoaService {
    async getOrAdd(nome: string, imagemUrl: string): Promise<Pessoa> {
        let pessoa = await knex("pessoa").where("nome", "=", nome).first();
        if (!pessoa) {
            pessoa = await this.create(nome, imagemUrl);
        }
        return pessoa;
    }
    async create(nome: string, imagemUrl: string): Promise<Pessoa> {
        const pessoa = new Pessoa({ nome, imagemUrl });
        const transaction = await knex.transaction();
        try {
            const [id] = await transaction("pessoa").insert(pessoa);
            pessoa.id = id;
        } catch (e) {
            transaction.rollback();
            throw e;
        }
        transaction.commit();

        return pessoa;
    }
}
export default new PessoaService();
