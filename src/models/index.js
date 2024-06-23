"use strict";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
// eslint-disable-next-line no-undef
const basename = path.basename(__filename);
const { DATABASE } = require("../config/index.js");

const db = {};

const sequelize = new Sequelize(
  DATABASE.database,
  DATABASE.username,
  DATABASE.password,
  DATABASE,
  {
    define: {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    pool: {
      max: 1000,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
  }
);

// eslint-disable-next-line no-undef
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    // eslint-disable-next-line no-undef
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const {
  Appointments,
  Categories,
  Messages,
  Reviews,
  Payments,
  Invoices,
  TherapistCategories,
  Therapists,
  Clients,
} = db;

Therapists.hasMany(Appointments, { foreignKey: "therapist_id" });
Appointments.Therapists(User, { foreignKey: "therapist_id" });

Therapists.hasMany(Reviews, { foreignKey: "therapist_id" });
Reviews.Therapists(User, { foreignKey: "therapist_id" });

Therapists.hasMany(TherapistCategories, { foreignKey: "therapist_id" });
TherapistCategories.Therapists(User, { foreignKey: "therapist_id" });

Categories.hasMany(TherapistCategories, { foreignKey: "category_id" });
TherapistCategories.Categories(User, { foreignKey: "category_id" });

Clients.hasMany(Appointments, { foreignKey: "client_id" });
Appointments.Clients(User, { foreignKey: "client_id" });

Clients.hasMany(Reviews, { foreignKey: "client_id" });
Reviews.Clients(User, { foreignKey: "client_id" });

Appointments.hasMany(Messages, { foreignKey: "appointment_id" });
Messages.belongsTo(Appointments, { foreignKey: "appointment_id" });

Payments.hasOne(Invoices, { foreignKey: "invoice_id" });
Invoices.belongsTo(Payments, { foreignKey: "invoice_id" });

Payments.hasOne(Appointments, { foreignKey: "payment_id" });
Appointments.belongsTo(Payments, { foreignKey: "payment_id" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
