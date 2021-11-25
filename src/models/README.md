# Entitys

**Resumen:** Este directorio contiene modelos o entidades que representan las tablas dentro de la base de datos.

Para el caso del proyecto `siga-charo` se usa `MySQL server 8.0`

## Nueva entidad

Para generar un **nuevo modelo o entidad** por ejemplo en otro manejador de BD, se recomienda usar el CLI de Loopback con:

```
lb4 model
```

Posteriormente el script pedirá los siguientes datos:

- Nombre de modelo (Ej: User)
- Clase de modelo `Entity` o `Model`
- Habilitar añadidura de campos de datos adicionales.
- A continuación se introducirán los campos datos del modelo con su respectivo tipo de datos.
