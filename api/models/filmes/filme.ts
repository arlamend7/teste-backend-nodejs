import { Pessoa } from "./pessoa";

export class Filme {
    id: number;
    titulo: string;
    videoUrl: string;
    imagemUrl: string;
    tituloDescricao: string;
    descricao: string;
    dataPublicacao: Date;
    generos: string[];
    atores: Pessoa[];
    notaMedia: number;
    diretores: Pessoa[];

    constructor(params: Partial<Filme>) {
        this.setTitulo(params.titulo);
        this.setVideoUrl(params.videoUrl);
        this.setimagemUrl(params.imagemUrl);
        this.setTituloDescricao(params.tituloDescricao);
        this.setDescricao(params.descricao);
        this.dataPublicacao = new Date();
    }
    setTitulo(titulo: string) {
        if (!titulo) {
            throw new Error("titulo obrigatório");
        }
        this.titulo = titulo;
    }
    setVideoUrl(videoUrl: string) {
        if (!videoUrl) {
            throw new Error("link do vídeo obrigatório");
        }
        this.videoUrl = videoUrl;
    }
    setimagemUrl(imagemUrl: string) {
        console.log(imagemUrl);
        
        if (!imagemUrl) {
            throw new Error("link da imagem obrigatório");
        }
        this.imagemUrl = imagemUrl;
    }
    setTituloDescricao(tituloDescricao: string) {
        this.tituloDescricao = tituloDescricao;
    }
    setDescricao(descricao: string) {
        this.descricao = descricao;
    }
}
