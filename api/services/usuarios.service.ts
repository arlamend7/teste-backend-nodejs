import knex from "../config/connection";
import { Usuario } from "../models/usuarios/usuario";

class UsuarioService {
    async Validar(id: number): Promise<Usuario> {
        const usuario = await knex("usuario").select("*").where("id", "=", id).first();
        if (!usuario) {
            throw new Error("Usuario não encontrado");
        }
        return usuario;
    }
    async recuperarPorEmail(email: string): Promise<Usuario> {
        return await knex("usuario")
            .select("*")
            .where("Email", email)
            .where("ativo", true)
            .first();
    }
    async criar(
        email: string,
        nome: string,
        senha: string,
        role: string
    ): Promise<Usuario> {
        await this.verificarEmailValido(email);
        const usuario = new Usuario({ nome, email, senha, role });
        const transaction = await knex.transaction();
        try {
            const [id] = await transaction("usuario").insert(usuario);
            usuario.id = id;
            transaction.commit();
        } catch (e) {
            transaction.rollback();
            throw new Error(
                "Não foi possivel inserir usuario no momento, tente mais tarde"
            );
        }
        return usuario;
    }
    async editar(
        id: number,
        email: string,
        nome: string,
        senha: string,
        newRole: string,
        changeRole: boolean
    ): Promise<Usuario> {
        const usuario = new Usuario(await this.Validar(id));
        if (email && usuario.email !== email) {
            await this.verificarEmailValido(email);
            usuario.setEmail(email);
        }
        if (nome && usuario.nome !== nome) {
            usuario.setNome(nome);
        }
        if (senha && usuario.senha !== senha) {
            usuario.setSenha(senha);
        }
        if (changeRole && usuario.role !== newRole) {
            usuario.role = newRole;
        }
        const transaction = await knex.transaction();
        try {
            await transaction("usuario").where("id", "=", id).update(usuario);
            transaction.commit();
        } catch (e) {
            transaction.rollback();
            throw e;
        }
        return usuario;
    }
    async desativar(id: number): Promise<void> {
        const usuario = new Usuario(await this.Validar(id));
        usuario.desativar();
        const transaction = await knex.transaction();
        try {
            await transaction("usuario").where("id", "=", id).update(usuario);
            transaction.commit();
        } catch (e) {
            transaction.rollback();
            throw e;
        }
    }
    async verificarEmailValido(email: string) {
        const usuario = await this.recuperarPorEmail(email);
        if (usuario) {
            throw new Error("Já existe um usuario ativo cadastrado com este email");
        }
    }
}
export default new UsuarioService();
