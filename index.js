// linea falsta para reiniciar deploy
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
console.log('imheere')

const server = require("./src/app.js");

const port = process.env.PORT || 3001;

const { conn } = require("./src/db.js");
const { preloadProfs } = require("./src/utils/preLoadProfs.js");

//cambiar mode para modificar modelos
mode = { alter: true };
//mode = { force: true }

// mode = { alter: true };

// Syncing all the models at once.
conn
  .sync(mode)
  .then(() => {
    preloadProfs();
  })
  .then(() => {
    server.listen(port, () => {
      console.log("listening at %s", port); // eslint-disable-line no-console
    });
  });
