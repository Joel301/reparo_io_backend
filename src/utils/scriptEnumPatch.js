const { conn } = require("../db.js");
// WARNING !!!!!
// Este script es muy pedigroso
// sirve cuando manda error el alter por el enum, primero se tiene que eliminar
// la columna/tabla se le hace drop y luego se le hace drop al enum

// verificar 2 veces a que DB se esta apuntando y es necesario los nombres 
// antes de iniciar
const TABLENAME = "payments"
const ENUMNAME = "enum_payments_status"
const run = async () => {
    try {

        await conn.sync()
        const inferfase = conn.getQueryInterface()
        await inferfase.dropTable(TABLENAME)
        await inferfase.dropEnum(ENUMNAME)
    } catch (error) {
        console.log(error)
    }
}
run()