# DDR Challenge

Esta api recebe e responde em formato JSON. Um serviço de scheduling será executado em background para realizar os matchings entre as tabulações e gravações cujo dados estão e serão armazenados no MongoDB.

**PS:** Use o arquivo .env.example para criar um arquivo .env com suas configurações de ambiente.

## Comandos

```
yarn install -> instala todas as dependências
yarn dev -> inicia o ambiente de desenvolvimento
yarn start -> inicia o servidor de produção (requer build)
yarn build -> gera os arquivos .js através dos arquivos typescript
yarn test -> executa todos os testes
```

## Endpoints

**/tabulations**
```js
axios.post('/tabulations', {
  clientName: 'Clayderson Ferreira',
  binedPhone: '11911111111',
  accessPhone: '11911111111',
  protocol: 'C202004002',
  calledAt: '2020-04-17 12:05:35',
});

//response

{
  "_id": "5e9a1ce9e7ee221e9d5881bf",
  "clientName": "Clayderson Ferreira",
  "binedPhone": "11911111111",
  "accessPhone": "11911111111",
  "protocol": "C202004002",
  "calledAt": "2020-04-17T15:05:35.000Z",
  "createdAt": "2020-04-17T21:17:29.333Z",
  "updatedAt": "2020-04-17T21:17:29.333Z",
  "__v": 0
}
```

**/recordings**
```js
axios.post('/recordings', {
  phone: '11911111111',
  branch: '174',
  recordedAt: '2020-04-17 12:05:35',
});

//response

{
  "_id": "5e9a1d5fe7ee221e9d5881c0",
  "phone": "11911111111",
  "branch": "174",
  "recordedAt": "2020-04-17T15:05:35.000Z",
  "createdAt": "2020-04-17T21:19:27.411Z",
  "updatedAt": "2020-04-17T21:19:27.411Z",
  "__v": 0
}
```

**/matchings**

Esta rota aceita os seguintes parâmetros: select, page e limit.

```
select (default: undefined) -> filtragem de campos usando o select do Mongoose
page (default: 1, min: 1) -> especifica a página a ser buscada
limit (default: 100, min: 1, max: 100) -> especifica a página a ser buscada
```

```js
axios.get('/matchings');

//response

{
  "total": 1,
  "pages": 1,
  "currentPage": 1,
  "data": [
    {
      "_id": "5e9a1d80e7ee221e9d5881c1",
      "recording": {
        "_id": "5e9a1d5fe7ee221e9d5881c0",
        "phone": "11911111111",
        "branch": "174",
        "recordedAt": "2020-04-17T15:05:35.000Z",
        "createdAt": "2020-04-17T21:19:27.411Z",
        "updatedAt": "2020-04-17T21:19:27.411Z",
        "__v": 0
      },
      "tabulation": {
        "_id": "5e9a1ce9e7ee221e9d5881bf",
        "clientName": "Clayderson Ferreira",
        "binedPhone": "11911111111",
        "accessPhone": "11911111111",
        "protocol": "C202004002",
        "calledAt": "2020-04-17T15:05:35.000Z",
        "createdAt": "2020-04-17T21:17:29.333Z",
        "updatedAt": "2020-04-17T21:17:29.333Z",
        "__v": 0
      },
      "createdAt": "2020-04-17T21:20:00.017Z",
      "updatedAt": "2020-04-17T21:20:00.017Z",
      "__v": 0
    }
  ]
}
```
