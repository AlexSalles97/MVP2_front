## 💻 Projeto WEB

Projeto de uma página web responsiva e simples desenvolvido por Alecsander Jesus Salles para o MVP da Sprint 2 da pós-graduação em Desenvolvimento Full Stack da PUC-Rio.

A seguinte página web tem como objetivo apresentar um cadastro de países, consultando as informações fornecidas pela api externa do IBGE.

## 🚀 Tecnologias

As seguintes tecnologias utilizadas foram:

- HTML
- CSS
- JavaScript
- Bootstrap
- Docker
- Git e Github
- API externa do IBGE: [Componente B](https://servicodados.ibge.gov.br/api/docs/paises/)

## ⚒️ Como executar

Basta abrir o arquivo index.html no seu browser.

OBS: Para adicionar, visualizar, editar e remover as informações da tabela é necessario estar com a api executando.

---
## ⚡ Como executar através do Docker

Certifique-se de ter o [Docker](https://docs.docker.com/engine/install/) instalado e em execução em sua máquina.

Navegue até o diretório que contém o Dockerfile no terminal.
Execute **como administrador** o seguinte comando para construir a imagem Docker:

```
$ docker build -t front .
```

Uma vez criada a imagem, para executar o container basta executar, **como administrador**, seguinte o comando:

```
$ docker run --rm -p 8080:80 front
```

Uma vez executando, para acessar a página web, basta abrir o [http://localhost:8080/#/](http://localhost:8080/#/) no navegador.

OBS: Para adicionar, visualizar, editar e remover as informações da tabela é necessario estar com a api executando.