'use strict';

/** @type {import('sequelize-cli').Migration} **/
module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.createTable('therapySessions', { 
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      therapistId: {
        type: DataTypes.UUID,
        references: {
          model: 'therapists',
          key: 'id'
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      participants: DataTypes.JSON,
      participantCount: DataTypes.INTEGER,
      status: DataTypes.ENUM('pending', 'active', 'inactive', 'failed'),
      sessionType: {
        type: DataTypes.ENUM('chat', 'video', 'audio'),
        allowNull: false
      },
      sessionTypeId: DataTypes.UUID
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('therapySessions');
    
  }
};
