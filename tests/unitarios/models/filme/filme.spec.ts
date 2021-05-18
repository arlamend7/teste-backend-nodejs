import { Filme } from "../../../../api/models/filmes/filme";

const filme = new Filme({ titulo: "arlan", imagemUrl: "https://eu.com" });
test("construtor", () => {
    expect(() => new Filme({})).toThrowError("Nome obrigatório");
    expect(() => new Filme({ titulo: "arlan" })).toThrowError("link da imagem obrigatório");
    expect(() => new Filme({ titulo: "arlan", imagemUrl: "https://eu.com" })).not.toThrowError();

    expect(filme.titulo).toBe("arlan");
    expect(filme.imagemUrl).toBe("https://eu.com");
});
test("setNome", () => {
    expect(() => filme.setTitulo("")).toThrowError("Nome obrigatório");
    expect(() => filme.setTitulo("a")).not.toThrowError("Nome obrigatório");
})

