# Api em Node.js


## **Criar migrates**

> npm i 

> npm run knex:migrate

## **Execução** 
adicionar arquivos na raiz do projeto: 

- credenciais.json - conexão com o banco
```json
{
    "user": "seu_usuario",
    "password": "******",
    "database": "seu_schema"
}
```

- .env
```env
SECRET=ALGUMA_CHAVE_DO_JWT
PORT=CASO_DESEJA_ALTERAR_PORTA
```
e executar : 
> npm i 

> npm start

<br>

## **Rotas, requests e reponses**
<br>

---
*Fazer login/ Recuperar token*
```http
POST localhost:3000/login
```
```json 
// Request - Body
{
	"email":"test@test.com",
	"senha":"Test@123"
}
```
<br>

*Fazer logout...*
```http
PUT localhost:3000/logout
```
```json 
// Request - Body
{}
```
<br>

### *Usuarios*
---
*Criar novo usuario*
```http
POST localhost:3000/usuarios
```
```json 
// Request - Body
{
	"email":"test@test.com",
	"nome":"testancio",
	"senha":"Test@123"
}
```
<br>

*Editar usuario*
```http
PUT localhost:3000/usuarios/{:id}
```
```json 
// Request - Body
{
	"email?":"test@test.com",
	"nome?":"testancio",
	"senha?":"Test@123"
}
```
<br>

*Deletar usuario (deleção logica)*
```http
DELETE localhost:3000/usuarios/{:id}
```
```json 
{}
```
<br>

### *Admin*
---
*Criar novo administrador*
```http
POST localhost:3000/admin
```
```json 
// Request - Body
{
	"email":"test@test.com",
	"nome":"testancio",
	"senha":"Test@123"
}
```
<br>

*Editar usuario como Administrador*
```http
PUT localhost:3000/admin/{:id}
```
```json 
// Request - Body
{
	"email?":"test@test.com",
	"nome?":"testancio",
	"senha?":"Test@123",
	"changeRole?":"BOOLEANO",
	"newRole?":"NOVA_ROLE"
}
```
<br>

*Deletar usuario como adminstrador (deleção logica)*
```http
DELETE localhost:3000/admin/{:id}
```
```json 
{}
```
<br>

### *Filmes*
---
<br>

Listar filmes paginada
```http
GET localhost:3000/filmes
```
```json 
// Request - Query
{
	"nomeDiretor?":"Nome do diretor pesquisado",
	"titulo?":"Titulo para pesquisar",
	"genero?":"Genero para pesquisar",
	"nomeAutor?" : "Nome do autor pesquisada",
	"qt?":"Quantidade de itens por pagina",
	"pg?":"pagina solicitada"
}
```
<br>

Recuperar filme detalhado
```http
GET localhost:3000/filmes/{:id}
```
```json 
{}
```
<br>

Cadastrar um filme
```http
POST localhost:3000/filmes
```
```json 
// Request - Body
{
	"titulo":"titulo",
	"videoUrl":"link do video",
	"imagemUrl":"link da imagem",
	"tituloDescricao?" : "titulo para descrição",
	"descricao?":"descrição aqui",
	"autores?" : [
		{ "nome": "eu", "imagemUrl": "https://eu.com.br"}
	],
	"diretores?" : [
		{ "nome": "eu", "imagemUrl": "https://eu.com.br"}
	],
	"generos?" : [
		"Documentary","Reality-TV"
	] 
	
}
```
<br>

Votar em um filme
```http
POST localhost:3000/filmes/{:id}/voto
```
```json 
// Request - Body
{
	"nota":"0 a 4",
}
```