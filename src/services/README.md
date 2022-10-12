#SERVICES

Acá se manejará la lógica de los request. Los parametros y querys enviado desde controllers y dentro de la función de servicios correspondientes.

Por ejemplo, el controllador getClientController tomará el parametro id desde la url y lo enviará a la función getClientService. Dentro de esta última se hará la verificación y la lógica de búsqueda en la DB o alguna API y el resultado se enviará a getClientController de nuevo para responder al front.

EJEMPLO:

function getClientController(req,res, next) {
    const {id} = res.params

    try {
    const client = getClientService(id) //Logica de busqueda

    res.json(client)

    } catch (e) {
        e.message = "error at getting client"
        next(e)
    }
}