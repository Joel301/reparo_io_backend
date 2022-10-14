const server = require("./src/app.js");
const port = process.env.PORT || 3000;
server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
});
