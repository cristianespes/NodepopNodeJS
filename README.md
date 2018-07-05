# NODEPOP (API)

## Installation

Install dependencies with:

```shell
npm install
```

## MongoDB

This application uses MongoDB.

### MongoDB Server

To start the MongoDB server, you can use:

```
./bin/mongod --dbpath ./data/db --directoryperdb
```

### MongoDB Client

To start as MongoDB client, you can use:

```
./bin/mongo
```


## Upload model files

To upload model files to mongoDB, you can use:

```shell
npm run installDB
```

## Production

To start the application in production mode use:

```shell
npm start
```

## Development

To start the application in development mode use:

```shell
npm run dev
```

NOTE: This mode uses nodemon.


## Cluster

To start the application in cluster mode use:

```shell
npm run cluster
```


## API Documentation

### Base URL
To go to the base url, you can use:
http://localhost:3000/apiv1/anuncios


### Register User

To register an user make a POST to: /apiv1/usuarios/registrarse

Insert the followings fields:
    - nombre
    - email
    - clave

### Authentication

To obtain a token make a POST to: /apiv1/usuarios/iniciarsesion

Use that token in the rest of request in:
    - header: 'x-access-token'
    - body: token
    - query string: token

### Language

The language selection is available in:
    - /apiv1/usuarios/iniciarsesion
    - /apiv1/usuarios/registrarse

To select the language, you can use:
    - query string: ?lang=es (or) en
    - header: Accept-Language = es (or) en
    - cookies: cookie = es (or) en

### Methods


### Filters

To filter by name, you can use:
?nombre=Bicicleta

To paginate results, you can use:
?skip=3&limit=2

To choose/show only some fields as shown:
&fields=nombre tags foto -_id

To order the list by name, you can use:
?sort=nombre
Warning: If you use this filter, first will be executed this filter and after the rest of the filters regardless of the order. The final result can be different than excepted.