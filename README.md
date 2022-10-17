# Descripcion de rutas del backend

## [URL]/home?search=[texto]

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

[URL]/home/professions

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
## [URL]/home/professionals

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