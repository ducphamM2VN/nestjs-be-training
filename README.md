# NestJSApiBoilerplateJWT

An API Boilerplate to create a ready-to-use REST API in seconds with NestJS 9.x and Passport Auth JWT System :heart_eyes_cat:

## Installation

```bash
   $ npm install
```

## Set Enviroment for secret key JWT and other configurations

```bash
   $ cp .env.example .env
```

To set up on multiple environments, such as dev, stage or prod, we do as follows:

```bash
   $ cp .env.example .env.dev # or .env.stage, etc
```

## Config settings .env for send notification when a user registers, forgot password or change password

```
  apiKey=[:apiKey]
  authDomain=[:authDomain]
  projectId=[:projectId]
  storageBucket=[:storageBucket]
  messagingSenderId=[:messagingSenderId]
  appId=[:appId]
  measurementId=[:measurementId]
  type=[:type]
  private_key_id=[:private_key_id]
  private_key=[:private_key]
  client_email=[:client_email]
  client_id=[:client_id]
  auth_uri=[:auth_uri]
  token_uri=[:token_uri]
  auth_provider_x509_cert_url=[:auth_provider_x509_cert_url]
  client_x509_cert_url=[:client_x509_cert_url]
```

## Install TypeScript Node

```bash
   $ npm install -g ts-node
```

## Running the app

```bash
    # development
    $ npm run start

    # watch mode
    $ npm run start:dev

    # production mode
    $ npm run start:prod
```
