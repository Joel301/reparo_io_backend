# Descripcion de rutas del backend

## Rutas API

## Professions
-   ### Mostrar todo _professional_

```
  GET https://reparoiobackend-main.up.railway.app/home/professionals
```
```
[{
        id: "93fdab72-6b0c-4b4d-a33f-f44774e7063c",
        firstName: "antonio",
        lastName: "gonzales",
        phoneNumber: 111111111,
        address: "hola estoy aqui",
        aboutMe: "There's no description available",
        email: "afrodito@reparo.io",
        password: "123",
        profileImg: "https://img.icons8.com/fluency-systems-regular/96/000000/guest-male.png",
        professions: [
            {
                "id": 10,
                "name": "plomero",
                "Prof_Prof": {
                    "professionalId": "93fdab72-6b0c-4b4d-a33f-f44774e7063c",
                    "professionId": 10
                }
            }
        ]
    }]
```

-   ### Buscar _professional_ por _id_

```
  GET https://reparoiobackend-main.up.railway.app/home/professionals/${id}
```

```
{
    id: "6bf9016f-427c-465a-97bb-332a283713b4",
    firstName: "lucas",
    lastName: "ca;o ramirez",
    profileImg: "https://img.icons8.com/fluency-systems-regular/96/000000/guest-male.png",
    reputation: "not available yet",
    professions: [
        {
            "id": 10,
            "name": "plomero",
            "Prof_Prof": {
                "professionalId": "6bf9016f-427c-465a-97bb-332a283713b4",
                "professionId": 10
            }
        }
    ]
}
```

-   ### Buscar _professional_ por nombre o apellido

```
    GET https://reparoiobackend-main.up.railway.app/home?search={search}
```


-   ### Agregar un professional
```
    POST  https://reparoiobackend-main.up.railway.app/home/professionals
```
Requiere:
```
{
    id: STRING,
    firstName: STRING,
    lastName: STRING,
    profileImg: STRING,
    address: STRING,
    phoneNumber: STRING,
    email: STRING,
    password: STRING,
    professions: []
}
```


---
##  Clients
-   ### Agregar un client
```
  POST _todavia no se pasa a produccion_
```

