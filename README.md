
# Teste MaxMilhas

Uma API REST conectada a um bando de dados via Docker, onde é possível inserir, deletar, ler um ou vários CPFs, a persistência no banco de dados e verificada seguindo o padão brasileiro de CPFs, garantindo a não inserção de CPFs duplicados e/ou inválidos.

Código escrito seguindo o paradigma de Programação Orientada a Objetos e os principos SOLID.


## Autor

- [Lucas Eduardo](mailto:lucaseduardolema@gmail.com)
- [GitHub](https://github.com/lucaseduardolema)
- [Linkedin](https://www.linkedin.com/in/lucas-eduardo-m-alves/)


## Stack utilizada

**Back-end:** Node, Express, TypeScript, Mongoose

**Banco de Dados:** MongoDB

**Ferramentas Utilizadas:** ESLint, Jest, Mocha, Chai, SuperTest, TS Node Dev, Express Async Errors, SwaggerUI

## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:lucaseduardolema/teste-max-milhas.git
```

Entre no diretório do projeto

```bash
  cd teste-max-milhas
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

PS: os serviços utilizaram as portas 3001 e 27017

```bash
  docker-compose up -d --build
```

PS2: Caso deseje rodar fora do docker, tenha instalado o Node v18.14 e MongoDB v6 e rode

```bash
  npm start
```

Acesse a rota do cliente SwaggerUI, veja a documentação e teste as rotas

```bash
  http://localhost:3001/doc/
```

## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test:mocha
```

Rode a cobertura dos testes com

```bash
  npm run test:coverage
```



## Variáveis de Ambiente

Para rodar esse projeto localmente, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`API_PORT`

`MONGO_URI`


## Documentação da API

#### Retorna a documentação no cliente SwaggerUI

```http
  GET /doc
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `undefined` | `undefined` | **Nenhum parâmetro nessário** |

#### Retorna todos os cpfs com suas respectivas datas de criação

```http
  GET /cpf
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `undefined` | `undefined` | **Nenhum parâmetro nessário** |

#### Retorna um cpf com sua respectiva data de criação

```http
  GET /cpf/${cpf}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `cpf`      | `string` | **Obrigatório**. O Cpf desejado será validado pelo padrão brasileiro |

#### Envia um cpf

```http
  POST /cpf
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `cpf`      | `string` | **Obrigatório**. Cpf será validado pelo padrão brasileiro |

#### Deleta um cpf

```http
  DELETE /cpf/${cpf}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `cpf`      | `string` | **Obrigatório**. Cpf será validado pelo padrão brasileiro |




## Feedback

Se você tiver algum feedback, por favor deixe saber por meio de lucaseduardolema@gmail.com
