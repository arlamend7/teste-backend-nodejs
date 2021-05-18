import { Usuario } from "../../../../api/models/usuarios/usuario";

const usuario = new Usuario({ nome: "arlan", email: "dev.arlamend7@gmail.com", senha: "A@123r" });
test("construtor", () => {
    expect(() => new Usuario({})).toThrowError("Nome obrigatório");
    expect(() => new Usuario({ nome: "arlan" })).toThrowError("Email obrigatório");
    expect(() => new Usuario({ nome: "arlan", email: "dev.arlamend7@gmail.com" })).toThrowError("Senha obrigatório");
    expect(() => new Usuario({ nome: "arlan", email: "dev.arlamend7@gmail.com", senha: "A@123r" })).not.toThrowError();
    expect(
        () => new Usuario({ nome: "arlan", email: "dev.arlamend7@gmail.com", senha: "A@123r", role: "Admin" })
    ).not.toThrowError();

    expect(usuario.nome).toBe("arlan");
    expect(usuario.email).toBe("dev.arlamend7@gmail.com");
    expect(usuario.senha).toBe("A@123r");
    expect(usuario.role).toBeNull();
    expect(usuario.ativo).toBeTruthy();
});
test("setNome", () => {
    expect(() => usuario.setNome("")).toThrowError("Nome obrigatório");
    expect(() => usuario.setNome("a")).not.toThrowError("Nome obrigatório");
});
test("setEmail", () => {
    expect(() => usuario.setEmail("")).toThrowError("Email obrigatório");
    expect(() => usuario.setEmail("dev.arlamend7")).toThrowError("Email inválido!");
    expect(() => usuario.setEmail("dev.arlamend7@gmail")).toThrowError("Email inválido!");
    expect(() => usuario.setEmail("dev.arlamend7@gmail.com")).not.toThrowError("Email inválido!");
});
test("setSenha", () => {
    expect(() => usuario.setSenha("")).toThrowError("Senha obrigatório");
    expect(() => usuario.setSenha("teste")).toThrowError("Senha muito pequena");
    expect(() => usuario.setSenha("teste1")).toThrowError(
        "Mínimo de seis caracteres, pelo menos uma letra, um número e um caractere especial"
    );
    expect(() => usuario.setSenha("test$1")).not.toThrowError(
        "Mínimo de seis caracteres, pelo menos uma letra, um número e um caractere especial"
    );
});
test("desativar", () => {
    expect(usuario.ativo).toBeTruthy();
    usuario.desativar();
    expect(usuario.ativo).toBeFalsy();
});
