"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Appointments", {
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
      payment_id: DataTypes.UUID,
      appointment_status: {
        type: DataTypes.ENUM(
          "pending",
          "fixed",
          "active",
          "inactive",
          "declined"
        ),
        allowNull: false,
        defaultValue: "pending",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Appointments");
  },
};
