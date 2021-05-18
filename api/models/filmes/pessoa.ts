export class Pessoa {
    id: number;
    nome: string;
    imagemUrl: string;
    constructor(params: Partial<Pessoa>) {
        this.setNome(params.nome);
        this.setImagemUrl(params.imagemUrl);
    }
    setNome(nome: string) {
        if (!nome) {
            throw new Error("Nome obrigatório");
        }
        this.nome = nome;
    }
    setImagemUrl(imagemUrl: string) {
        if (!imagemUrl) {
            throw new Error("link da imagem obrigatório");
        }
        this.imagemUrl = imagemUrl;
    }
}
