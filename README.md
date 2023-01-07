# 🏁 KImóveis

Para inciar, é necessário instalar as dependências, que serão utilizadas nos testes. Portanto utilize o comando abaixo para instalar tais dependências:

````
yarn 
````

ou

````
npm i
````

<br>
**Configure as variáveis de ambiente no seu .env**, passando as credenciais corretas para conectar em seu banco local


Com isso feito, para rodar sua aplicação, basta utilizar o comando
````
yarn dev
````

ou

````
npm dev
````

<br>

# **Sobre os testes**

Os testes estão localizados em `src/__tests__`.

Na subpasta `integration` estão os testes.

Já na subpasta `mocks` estão os dados que serão utilizados para os testes.

No arquivo `jest.config.json` estão algumas configurações necessárias para os testes rodarem.

**`De modo algum altere qualquer um desses arquivos.`** Isso poderá comprometer a integridade dos testes.

E também não altere o script de `test` localizado no `package.json`. Isso será utilizado para rodar os testes.

<br>


# **Rodando os testes** 

Para rodar os testes é necessário que no seu terminal, você esteja dentro do diretório do projeto.

Estando no terminal e dentro do caminho correto, você poderá utilizar os comandos a seguir:

### Rodar todos os testes

````
yarn test
````

ou


````
npm test
````
<br>

#
### Rodar todos os testes e ter um log ainda mais completo

````
yarn test --all
````

ou

````
yarn test --all
````

<br>

#

### Rodar os testes de uma pasta específica
`detalhe: repare que tests está envolvido por 2 underlines. Isso se chama dunder.`

````
yarn test ./scr/__tests__/integration/<subpasta>
````

ou


````
npm test ./scr/__tests__/integration/<subpasta>
````

<br>

#
### Rodar os testes de um arquivo específico

````
yarn test ./scr/__tests__/integration/<subpasta>/<arquivo>
````

ou


````
npm test ./scr/__tests__/integration/<subpasta>/<arquivo>
````
<br>

#
### Rodar um teste específico

````
yarn test -t <describe ou test específico envolto em aspas>
````

ou


````
npm test -t <describe ou test específico envolto em aspas>
````

````
\\ ex: yarn test -t "/categories"
\\ rodaria os testes do describe "/categorias" no caminho
\\ ./scr/__tests__/integration/categories/categoriesRoutes.test.ts
````

<br>


**Caso você queira verificar todas as opções de execução de testes, visite a [Documentação oficial do Jest](https://jestjs.io/docs/cli)**

Após rodar um dos comandos aparecerá um log no seu terminal, contendo as informações da execução do teste.

**Observação:** O teste pode demorar alguns segundos para ser finalizado. Quanto maior for o teste, mais tempo será consumido para a execução.

#
_______________________________________________________________________________________________________________________________________________________________________

# 🏁 Rotas

:heavy_exclamation_mark: **Pronto, agora seu banco de dados está conectado com sua Api. A Url base será** "https://localhost:3000" :heavy_exclamation_mark:

🟢 **POST - /user**


* Rota para fazer registro do usuário. 

     
**Request:**
````
{
	name: string,
	email: string,
	password: string,
	isAdm: boolean
}`
````
	
**Response:** 
````
{
    id: string,
    name: string,
    email: string,
    isAdm: boolean, 
    createdAt: Date,
    updatedAt: Date,
}
````

_______________________________________________________________________________________________________________________________________________________________________

🔵 **GET - /users**

* Rota para listar os usuários. **(OBS: A rota pode ser acessada apenas por administradores.)**

**Response:** 
````
[
  {
    id: string,
    name: string,
    email: string,
    isAdm: boolean, 
    createdAt: Date,
    updatedAt: Date,
  },
  {
    id: string,
    name: string,
    email: string,
    isAdm: boolean, 
    createdAt: Date,
    updatedAt: Date,
  }
]

````

_______________________________________________________________________________________________________________________________________________________________________

🟡 **PATCH - /user/<id-usuário>**

* atualiza os dados do usuário. **(OBS: Não é possível atualizar os campos id, isAdm e isActive.)**

:heavy_exclamation_mark: Apenas administradores podem atualizar qualquer usuário, usuários não-administradores podem apenas atualizar seu próprio usuário. :heavy_exclamation_mark:

**Request:**
````
  	{
      name?: string,
      email?: string,
    }
````

**Response:** 
````
    {
      id: string,
      name: string,
      email: string,
      isAdm: boolean, 
      createdAt: Date,
      updatedAt: Date,
    }
````

_______________________________________________________________________________________________________________________________________________________________________

🔴 **DELETE - /user/<id-usuário>**

* Excluí usuário **(OBS: a rota só pode ser acessada apenas por administradores.)**

:heavy_exclamation_mark: Não é possível realizar um soft delete em um usuário inativo. :heavy_exclamation_mark:

_______________________________________________________________________________________________________________________________________________________________________






