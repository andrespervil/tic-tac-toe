# Tic Tac Toe

_Simple 3 en raya con estadisticas contra la IA_

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

Mira **Deployment** para conocer como desplegar el proyecto.

### Pre-requisitos 📋

_Que cosas necesitas para instalar el software y como instalarlas_

```
Node 14.18.2 o superior

(Opcional) Docker y docker-compose
```

### Instalación 🔧

_Con docker-compose_

```
docker-compose build --parallel
docker-compose up -d
```

_Usando npm o yarn_

Necesitaremos una bbdd de mongodb y crear los .env en cada uno de los paquetes.
Los .env deben de seguir la estructura del ejemplo

```
npm i -g lerna
lerna bootstrap
```

```
yarn
yarn lerna bootstrap
```

_Despues simplemente entramos en cada uno de los paquetes y ejecutamos el comando `yarn dev` o `npm run dev`_

## Ejecutando los Tests ⚙️

_Con el comando `yarn test` se correran los test del paquete en el que nos encontremos_

## Puertos

La web usa el puerto 3000.
La API usa el puerto 5000.
