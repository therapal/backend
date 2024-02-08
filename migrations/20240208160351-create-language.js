"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("languages", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      languageName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isoCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nativeName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alternateName: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("languages");
  },
};
