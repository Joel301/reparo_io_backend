# Descripcion de rutas del backend

## GET [URL]/home?search=[texto]

-   Busca en la DB coincidencias en el nombre y apeido del usuario
-   Retorna array de Profesionales
-   En caso de no encontrar Resultados Devuelve un array con el texto "No professional found" y status 204
-   El formato de profesionales es:

```
[
    {
    "id": "66cf3768-37e2-41cc-af94-47a77fc2946b",
    "firstName": "hiram",
    "lastName": "rivero",
    "phoneNumber": 111111111,
    "address": "hola estoy aqui",
    "aboutMe": "soy un pokemon",
    "profileImg": "https://img.icons8.com/fluency-systems-regular/96/000000/guest-male.png"
}
]
```

## GET [URL]/home/professions

-   Regresa un Array de Profesiones
-   El formato es :

```[
    {
        "id": 8,
        "name": "jardinero"
        },
        {
        "id": 10,
        "name": "plomero"
        },
        {
        "id": 6,
        "name": "gasista"
        }
    ]

```

## GET [URL]/home/professionals

-   Busca en la DB lista completa de Profesionales
-   Retorna array de Profesionales
-   En caso de no encontrar Resultados Devuelve un array vacio
-   El formato de profesionales es:

```
[
    {
    "id": "66cf3768-37e2-41cc-af94-47a77fc2946b",
    "firstName": "hiram",
    "lastName": "rivero",
    "phoneNumber": 111111111,
    "address": "hola estoy aqui",
    "aboutMe": "soy un pokemon",
    "profileImg": "https://img.icons8.com/fluency-systems-regular/96/000000/guest-male.png"
},
]
```

## GET [URL]/home/professionals/:id

-   Busca retorna el detalle de la info de el profesional segun id, debe ser coincidencia exacta
-   En caso de no encontrar Resultados Devuelve status 404 y el texto **not Found**
-   En caso de enviar un id que no sea uuid Devuelve status 404 y el texto **Invalid UUID Format**
-   El formato de profesionales es:

```
{
    "id": "51bfacc5-ca28-4f99-895c-e0d2e4bd70c1",
    "firstName": "hiram",
    "lastName": "rivero",
    "profileImg": "https://img.icons8.com/fluency-systems-regular/96/000000/guest-male.png",
    "reputation": "not available yet",
    "professions": [
    {
        "id": 5,
        "name": "electricista",
        "Prof_Prof": {
            "professionalId": "51bfacc5-ca28-4f99-895c-e0d2e4bd70c1",
            "professionId": 5
    }
    },
    {
        "id": 10,
        "name": "plomero",
        "Prof_Prof": {
        "professionalId": "51bfacc5-ca28-4f99-895c-e0d2e4bd70c1",
        "professionId": 10
    }
    }
    ]
}
```

## POST [URL]/home/professionals

-   El campo firstName es requerido
-   Al ser id generado se puede duplicar
-   el array professions admite array de nombres **coincidencia exacta** y array de id's mezclado
-   FORMATO PARA ENVIARLO:

```
{
    "firstName": "hiram",
    "lastName": "rivero",
    "password": "123",
    "email": "juanito@reparo.io",
    "phoneNumber": 111111111,
    "profileImg": "url",
    "aboutMe": "soy un pokemon",
    "address": "hola estoy aqui",
    "professions": ["electricista", "plomero"]

}‌
```

-   RESPUESTA:

{message: “agregado”}

-   Si Error:

STRING(mensaje del error)
