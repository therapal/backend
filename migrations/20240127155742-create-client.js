'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    
    await queryInterface.createTable('clients', { 
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false
      },
      role: {
          type: DataTypes.STRING,
          defaultValue: 'client'
      }
    });
  },

  async down (queryInterface) {
    
    await queryInterface.dropTable('clients');
  }
};
