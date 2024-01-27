'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
   
    await queryInterface.createTable('chatSessions', { 
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      therapySessionId: {
        type: DataTypes.UUID,
        references: {
          model: 'therapySessions',
          key: 'id'
       },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('chatSessions');
  }
};
