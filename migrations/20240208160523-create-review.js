"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Reviews", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      therapist_id: {
        type: DataTypes.UUID,
        references: {
          model: "Therapists",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      client_id: {
        type: DataTypes.UUID,
        references: {
          model: "Clients",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      rating: DataTypes.INTEGER,
      content: DataTypes.TEXT,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Reviews");
  },
};
