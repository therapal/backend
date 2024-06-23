"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Clients", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      verified_email: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      account_status: {
        type: DataTypes.ENUM("active", "inactive", "blocked"),
        allowNull: false,
        defaultValue: "active",
      },
      gender: {
        type: DataTypes.ENUM("male", "female", "neutral"),
        allowNull: false,
        defaultValue: "neutral",
      },
      profile_picture: DataTypes.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Clients");
  },
};
