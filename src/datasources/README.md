# Datasources

**Resumen:** Este directorio contiene la configuración de las fuentes de datos utilizadas por esta aplicación.

---

Para el caso del proyecto `siga-charo` se usa `MySQL server 8.0`

## Nueva Fuente de datos

Para generar una **nueva fuente de datos** por ejemplo en otro manejador de BD, se recomienda usar el CLI de Loopback con:

```
lb4 datasource
```

Posteriormente el script pedirá los siguientes datos:

- Nombre de la fuente de datos
- Conector **(MySQL, PostgresSQL, MS SQL, SQLite, MongoDB, REST API)**
- (Opcional) URL de configuración de BD **(Ej: `mysql://user:password@host/dbName`)**
- Host de la BD **(Ej: localhost o IP Remota)**
- Puerto del servidor de BD **(Ej: 3306)**
- Usuario con acceso a servidor de BD **(Ej: root)**
- Password del usuario
