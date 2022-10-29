require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

  // 'postgres://postgres:maty18:5432/reparoio'
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/reparoio`,

  // `postgresql://postgres:nVqZlTmsw0QiBByyVOAD@containers-us-west-43.railway.app:6056/railway`, //DEVELOP

  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring



const {
  Profession,
  Professional,
  Prof_Prof,
  Client,
  OrderDetail,
  Order,
  Reservation,
  Review,
  Cart,
} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Professional.belongsToMany(Profession, { through: Prof_Prof });
Profession.belongsToMany(Professional, { through: Prof_Prof });


Professional.hasMany(Review);
Review.belongsTo(Professional);

Client.hasMany(Review);
Review.belongsTo(Client);

Client.hasMany(Order);
Order.belongsTo(Client);

Order.hasMany(OrderDetail);
OrderDetail.belongsTo(Order);

Professional.hasMany(OrderDetail);
OrderDetail.belongsTo(Professional);

Professional.hasMany(Reservation);
Reservation.belongsTo(Professional);

OrderDetail.hasOne(Reservation);
Reservation.belongsTo(OrderDetail);
////////////////////////////////////
Client.hasMany(Cart);
Cart.belongsTo(Client);

Professional.hasMany(Cart);
Cart.belongsTo(Professional);


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};