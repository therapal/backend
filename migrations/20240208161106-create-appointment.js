"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("appointments", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      therapistId: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      clientId: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      transactionId: DataTypes.UUID,
      timestamp: DataTypes.DATE, // appointment date
      status: {
        type: DataTypes.ENUM(
          "pending",
          "fixed",
          "active",
          "inactive",
          "declined",
        ),
        allowNull: false,
        defaultValue: "pending",
      },
      outcome: DataTypes.TEXT,
      notes: DataTypes.TEXT,
      appointmentFormat: DataTypes.ENUM("chat"),
      appointmentFormatId: DataTypes.UUID,
      followUpRecommendation: DataTypes.TEXT,
      durationMinutes: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("appointments");
  },
};
