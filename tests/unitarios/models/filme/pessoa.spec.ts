import { Pessoa } from "../../../../api/models/filmes/pessoa";

const pessoa = new Pessoa({ nome: "arlan", imagemUrl: "https://eu.com" });
test("construtor", () => {
    expect(() => new Pessoa({})).toThrowError("Nome obrigatório");
    expect(() => new Pessoa({ nome: "arlan" })).toThrowError("link da imagem obrigatório");
    expect(() => new Pessoa({ nome: "arlan", imagemUrl: "https://eu.com" })).not.toThrowError();

    expect(pessoa.nome).toBe("arlan");
    expect(pessoa.imagemUrl).toBe("https://eu.com");
});
test("setNome", () => {
    expect(() => pessoa.setNome("")).toThrowError("Nome obrigatório");
    expect(() => pessoa.setNome("a")).not.toThrowError("Nome obrigatório");
})
test("setImagemUrl", () => {
    expect(() => pessoa.setImagemUrl("")).toThrowError("link da imagem obrigatório");
    expect(() => pessoa.setImagemUrl("https://eu.com")).not.toThrowError("link da imagem obrigatório");
})
