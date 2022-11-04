require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/reparoio`,
 // "postgresql://postgres:R9QP0NLfu1I2XSq1w3e4@containers-us-west-66.railway.app:6000/railway", //DEVELOP
  // "postgresql://postgres:StAexDOXnSaL6lHRmIRM@containers-us-west-94.railway.app:5680/railway", //PRODUCCION

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
  User,
  Admin,
  Review,
  Cart,
  CartDetail,
  Payment
} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
//  PROFESIONALES---PROFESIONES
Professional.belongsToMany(Profession, { through: Prof_Prof });
Profession.belongsToMany(Professional, { through: Prof_Prof });

//  PROFESIONALES---USUARIOS---ADMIN----CLIENT
User.belongsTo(Professional);
Professional.hasOne(User);
User.belongsTo(Client);
Client.hasOne(User);
User.belongsTo(Admin);
Admin.hasOne(User);

//  PROFESIONALES---REVIEWS----CLIENT
Review.belongsTo(Professional);

Client.hasMany(Review);
Review.belongsTo(Client);

//  CARRITO EMPIEZA AQUI
Client.hasOne(Cart);
Cart.belongsTo(Client);

Cart.hasMany(CartDetail);
CartDetail.belongsTo(Cart);

Professional.hasMany(CartDetail);
CartDetail.belongsTo(Professional);

// COMPRAS
Client.hasMany(Order);

Order.hasMany(OrderDetail, {
  onDelete: "CASCADE",
});
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

// Client.hasMany(Payment);
// Payment.belongsTo(Client);

Professional.hasMany(Cart);
Cart.belongsTo(Professional);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
