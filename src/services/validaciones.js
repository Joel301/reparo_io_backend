function isStringOk(data) {
    data.forEach((element) => {
        if (typeof element !== "string")
            throw new Error(`INPUT_ERROR: ${element} is not a String`);
        if (element.trim() === "")
            throw new Error(`INPUT_ERROR: ${element} cannot be empty`);
    });
}

function isArrayOk(data) {
    if (typeof data !== "object")
        throw new Error(`INPUT_ERROR: ${data} is not an Array`);
}

function isEmail(data) {
    if (!data) throw new Error(`INPUT_ERROR: email cannot be empty`);
    if (data.trim() === "")
        throw new Error(`INPUT_ERROR: ${element} cannot be empty`);
    if (
        !data.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    )
        throw new Error(`${data} is not an email`);
}

module.exports = {
    isStringOk,
    isArrayOk,
    isEmail,
}