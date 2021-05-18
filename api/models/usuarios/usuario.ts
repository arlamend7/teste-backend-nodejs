const regexSenha = new RegExp(
    /^(?=.*\w)(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z\d@$!%*#?&]{6,}$/
);
const regexEmail = new RegExp(/^.*?\@\w+\.\w+$/);
export class Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    role: string | null;
    ativo: boolean;
    constructor(params: Partial<Usuario>) {
        this.setNome(params.nome);
        this.setEmail(params.email);
        this.setSenha(params.senha);
        this.role = params.role || null;
        this.ativo = params.ativo || true;
    }
    setNome(nome: string) {
        if (!nome) {
            throw new Error("Nome obrigatório");
        }
        this.nome = nome;
    }
    setEmail(email: string) {
        if (!email) {
            throw new Error("Email obrigatório");
        } else if (!regexEmail.exec(email)) {
            throw new Error("Email inválido!");
        }
        this.email = email;
    }
    setSenha(senha: string) {
        if (!senha) {
            throw new Error("Senha obrigatório");
        } else if (senha.length < 6) {
            throw new Error("Senha muito pequena");
        } else if (!regexSenha.exec(senha)) {
            throw new Error(
                "Mínimo de seis caracteres, pelo menos uma letra, um número e um caractere especial"
            );
        }
        this.senha = senha;
    }
    desativar() {
        this.ativo = false;
    }
}
