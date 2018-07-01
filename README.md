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


## API Documentation

### Base URL
La ruta base para llamar a todas las APIs...
http://localhost:3000/apiv1/anuncios


### Authentication
Autenticación....

To paginate results, you can use:
?skip=3&limit=2

To choose only some fields:
&fields=nombre tags foto -_id

Al hacer sort, primero lo ordena y luego aplica el resto de filtros