# NODEPOP (API)

-------------------------------------------------------------------------------

## Installation

Install dependencies with:

```shell
npm install
```

-------------------------------------------------------------------------------

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

-------------------------------------------------------------------------------

## Start the API

### Upload model files

To upload model files to mongoDB, you can use:

```shell
npm run installDB
```

### Production

To start the application in production mode use:

```shell
npm start
```

### Development

To start the application in development mode use:

```shell
npm run dev
```

NOTE: This mode uses nodemon.

### Cluster

To start the application in cluster mode use:

```shell
npm run cluster
```

-------------------------------------------------------------------------------

## API Documentation


### USERS

#### Base URL

To go to the base URL, you can use:

http://localhost:3000/apiv1/usuarios

https://nodepop.cristianespes.com/apiv1/usuarios  (Domain for the DevOps Infrastucture)

#### Register User - POST Method

To register an user, make a POST to: /registrarse

http://localhost:3000/apiv1/usuarios/registrarse

Insert the followings fields:

    - nombre
    - email
    - clave

#### Authentication - POST Method

To obtain a token, make a POST to: /iniciarsesion

http://localhost:3000/apiv1/usuarios/iniciarsesion

Use that token in the rest of request in:

    - header: 'x-access-token'
    - body: token
    - query string: token=###tokenValue###

#### Language

The language selection is available in:

    - /iniciarsesion
    - /registrarse

To select the language, you can use:

    - query string:
    ?lang=es (or) en

    - header:
    Accept-Language = es (or) en

    - cookies:
    cookie = es (or) en


### ADVERTISEMENTS

#### Base URL

To go to the base URL, you can use:

http://localhost:3000/apiv1/anuncios

https://nodepop.cristianespes.com/apiv1/anuncios (Domain for the DevOps Infrastucture)

#### Searching - GET Method

To view all products, make a GET adding the token to: ?token=###tokenValue###

http://localhost:3000/apiv1/anuncios?token=###tokenValue###

To find that you want, you can search directly on the list of the all products.

Or you can add the following filters:

    - To filter by name, you can use: &nombre=Bicicleta
    http://localhost:3000/apiv1/anuncios?token=###tokenValue###&nombre=Bicicleta

    - To paginate results, you can use: &skip=3&limit=2
    http://localhost:3000/apiv1/anuncios?token=###tokenValue###&skip=3&limit=2

    - To choose/show only some fields as shown: &fields=nombre tags foto -_id
    http://localhost:3000/apiv1/anuncios?token=###tokenValue###&fields=nombre tags foto -_id

    - (*) To order the list by name, you can use: &sort=nombre
    http://localhost:3000/apiv1/anuncios?token=###tokenValue###&sort=precio

Warning (*): If you use this filter, first will be executed this filter and after the rest of the filters regardless of the order. The final result can be different than excepted.

Note: The filters can be combined with each other:

http://localhost:3000/apiv1/anuncios?token=###tokenValue###&fields=nombre%20precio%20foto%20-_id&sort=precio

#### View Images of the Products - GET Method

To view the images of the product shall be from base URL:

http://localhost:3000

And the product description shows the rest of the path.

#### Tags of the Products - GET Method

To view the available tags of the products, you can use:

    - /apiv1/anuncios/tags
    http://localhost:3000/apiv1/anuncios/tags

#### Upload a new Advertisement - POST Method

To upload a new advertisement, make a POST to: /apiv1/anuncios

http://localhost:3000/apiv1/anuncios

Insert the followings fields:

    - nombre: article name
    - venta: true (to sell) or false (to buy)
    - precio: article price
    - foto: path to image
    - tags: choose tags fot the article

#### Update an Advertisement - PUT Method

To update an advertisement, make a PUT to: /apiv1/anuncios/###advertisementID###

http://localhost:3000/apiv1/anuncios/###advertisementID###

Insert the new content of the fields to be modified:

    - nombre
    - venta
    - precio
    - foto
    - tags (*)

Warning (*): This will remove all previous tags and only show the new tags inserted.

#### Delete an Advertisement - DELETE Method

To delete an advertisement, make a DELETE to: /apiv1/anuncios/###advertisementID###

http://localhost:3000/apiv1/anuncios/###advertisementID###

-------------------------------------------------------------------------------

## DevOps Module

- To test the infrastucture of the API, replace the base URL http://localhost:3000 by the domain https://nodepop.cristianespes.com

- The domain of the static web page is https://web.cristianespes.com

