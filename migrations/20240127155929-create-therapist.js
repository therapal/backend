'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    
    await queryInterface.createTable('therapists', { 
      id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true
      },
      email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false
      },
      role: {
          type: DataTypes.STRING,
          defaultValue: 'therapist'
      },
      categories: DataTypes.JSON
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('therapists');
  }
};
