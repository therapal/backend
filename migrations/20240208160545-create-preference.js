"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("preferences", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      categories: DataTypes.JSON, // array of ID referenced from "categories" table PK
      gender: {
        type: DataTypes.ENUM("male", "female", "neutral"),
        defaultValue: "neutral",
      },
      experienceLevel: DataTypes.ENUM("experienced"),
      languages: DataTypes.JSON, // IDs of preferred languages
      therapyFormat: DataTypes.ENUM("chat", "video"),
      availability: DataTypes.JSON,
      minTherapistRating: DataTypes.INTEGER,
      userId: {
        type: DataTypes.UUID,
        unique: true,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("preferences");
  },
};
