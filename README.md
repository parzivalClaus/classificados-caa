<p align="center">
  <img width="150" height="auto" src="https://raw.githubusercontent.com/parzivalClaus/classificados-caa/master/web/src/assets/logo.png">
</p>

# Classificados C.A.A.

> Sistema de Classificados (Cadastro e busca de empresas)

## Instalação e utilização

### > Backend - Node.js

> Instalação e Configuração - Docker<br/>
> Realize a instalação e configuração do docker e permissão para o usuário da maquina rodar o docker conforme este <a href="https://docs.docker.com/">link!</a>

1.  Acesse a pasta server e siga os passos abaixos:
2.  Rodar esse comando para instalar as dependências:

```
yarn
```

3.  Instalar, criar e subir um banco de dados Postgres (Usei via docker):

```
docker run --name classificados -e POSTGRES_PASSWORD=classificados -p 5432:5432 -d postgres:11
docker start classificados
```

4.  Instalar, criar e subir um banco de dados Redis (Usei via docker):

```
docker run --name classificadoscaa -p 6379:6379 -d -t redis:alpine
docker start classificadoscaa
```

5.  Acesse o banco postgres com algum gerenciador como exemplo postbird, crie o banco com nome de classificadoscaa
6.  Alterar o arquivo .env.example para .env e alterar as informações
7.  Rodar:

```
yarn sequelize db:migrate
```

8. Rodar:

```
yarn sequelize db:seed:all
```

9. Rodar: // Servidor

```
yarn dev
```

10. Rodar: // Servidor de envio de e-mails

```
yarn queue
```

### > Frontend WEB - REACTJS

1.  Acesse a pasta web
2.  Rodar para instalar as dependências:

```
yarn
```

3.  Rodar:

```
yarn start
```

### > Mobile APP - React Native

1.  Acesse a pasta app
2.  Rodar para instalar as dependências:

```
yarn
```

3.  Alterar o arquivo .env.example para .env e alterar as informações

4.  Em uma guia do terminal, rode:

```
expo start
```

5. Após finalizar, escaneie o QrCode pra instalar o App:

Obs: Projeto testado apenas no Android
