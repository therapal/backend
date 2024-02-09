"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const config = require("../config/index.js");
const db = {};

const sequelize = new Sequelize(
  config.database.database,
  config.database.username,
  config.database.password,
  config.database,
);

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
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const {
  appointments: Appointment,
  categories: Category,
  languages: Language,
  messages: Message,
  notifications: Notification,
  preferences: Preference,
  preferredLanguages: PreferredLanguage,
  profiles: Profile,
  reviews: Review,
  specialisations: Specialisation,
  tokens: Token,
  transactions: Transaction,
  users: User,
} = db;

User.hasMany(Message, { foreignKey: "clientId" });
Message.belongsTo(User, { foreignKey: "clientId" });

User.hasMany(Message, { foreignKey: "therapistId" });
Message.belongsTo(User, { foreignKey: "therapistId" });

User.hasMany(Appointment, { foreignKey: "userId" });
Appointment.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Notification, { foreignKey: "userId" });
Notification.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Token, { foreignKey: "userId" });
Token.belongsTo(User, { foreignKey: "userId" });

User.hasOne(Profile, { foreignKey: "userId" });
Profile.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Preference, { foreignKey: "userId" });
Preference.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Review, { foreignKey: "clientId" });
Review.belongsTo(User, { foreignKey: "clientId" });

User.hasMany(Review, { foreignKey: "therapistId" });
Review.belongsTo(User, { foreignKey: "therapistId" });

Appointment.hasOne(Transaction, { foreignKey: "appointmentId" });
Transaction.belongsTo(Appointment, { foreignKey: "appointmentId" });

Appointment.hasMany(Message, { foreignKey: "appointmentId" });
Message.belongsTo(Appointment, { foreignKey: "appointmentId" });

User.hasMany(Message, { foreignKey: "clientId" });
Message.belongsTo(User, { foreignKey: "clientId" });

User.hasMany(Message, { foreignKey: "therapistId" });
Message.belongsTo(User, { foreignKey: "therapistId" });

User.hasMany(PreferredLanguage, { foreignKey: "userId" });
PreferredLanguage.belongsTo(User, { foreignKey: "userId" });

Language.hasOne(PreferredLanguage, { foreignKey: "languageId" });
PreferredLanguage.belongsTo(Language, { foreignKey: "languageId" });

Category.hasOne(Specialisation, { foreignKey: "categoryId" });
Specialisation.belongsTo(Category, { foreignKey: "categoryId" });

User.hasMany(Specialisation, { foreignKey: "userId" });
Specialisation.belongsTo(User, { foreignKey: "userId" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
