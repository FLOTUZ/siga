# api-siga-charo

Esta aplicaicón fué generada con [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) con la [plantilla inicial por defecto](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

## Instalar dependencias

De forma predeterminada, las dependencias se instalaron cuando se generó esta aplicación. Siempre que se modifiquen las dependencias en `package.json`, ejecute el siguiente comando:

```sh
npm install
```

Para instalar solo las dependencias resueltas en `package-lock.json`:

```sh
npm ci
```

## Correr la aplicación

```sh
npm start
```

También puedes ejecutar  `node .` para omitir el proceso de "build".

Abre http://127.0.0.1:4000 en el buscador

## Reconstruye el proyecto

Para construir el proyecto de forma incremental:

```sh
npm run build
```

Para forzar una compilación completa limpiando los artefactos almacenados en caché:

```sh
npm run rebuild
```

## Solucionar problemas de formato y estilo de código

```sh
npm run lint
```

Para solucionar automáticamente estos problemas:

```sh
npm run lint:fix
```

## Otros comandos útiles

- `npm run migrate`: Migrar esquemas de base de datos para modelos
- `npm run openapi-spec`: Genere la especificación de OpenAPI en un archivo

## Tests

```sh
npm test
```

## Que sigue?

Por favor vé la [documentación de LoopBack 4](https://loopback.io/doc/en/lb4/) para
entender como puedes continuar añadiendo funcionalidades a la aplicación.

[![LoopBack](https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
