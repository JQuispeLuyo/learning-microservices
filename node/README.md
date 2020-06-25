# Microservicios 

Este es un pequeño ejemplo de microservicios en NodeJS, Nestjs, MongoDB y Kafka

## Instalación

```
$ docker-compose up -d
```

Este proceso tardara un poco, por que bajara las imagenes que talvez no las tenga e instalará las dependencias de cada microservicio.

Una vez terminado el proceso, ingrese en su navegador a [http://localhost:3000](http://localhost:3000) y vera una lista de Apis con los que se comunica con el cliente.

### Nota

Si quiere modificar algun microservicio para poder reflejar los cambios ingrese 

```
$ docker-compose build <nombre del servicio>

// ejemplo
$ docker-compose build email
```
Luego de esperar su ejecución levante el servicio 

```
$ docker-compose up <nombre del servicio>

// ejemplo
$ docker-compose up email 
```
