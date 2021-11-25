# Controllers

**Resumen:** Este directorio contiene los controladores que representan los "endpoints" a los cuales se harán peticiones desde el Frontend o desde un cliente REST.

En ésta clase se definen los métodos CRUD para nuestra aplicación así como lógica de negocio añadida.

## Nuevo Controller

Para generar un **nuevo modelo o entidad ** por ejemplo en otro manejador de BD, se recomienda usar el CLI de Loopback con:

```
lb4 controller
```

El CLI de Loopback comenzará a hacer preguntas de configuración para el controlador:

- Tipo de controlador (EJ. CRUD o Empty)
- Nombre del Modelo o Entidad para este CRUD (Ej. User)
- Nombre del repositorio (Ej. UserRepository)
- Nombre del ID del Modelo (Ej. idUser)
- El Id es omitido cuando se crea una nueva instancia? y/N
