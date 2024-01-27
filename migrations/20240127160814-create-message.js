'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.createTable('messages', { 
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      chatSessionId: {
        type: DataTypes.UUID,
        references: {
          model: 'chatSessions',
          key: 'id'
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
      sender: {
        type: DataTypes.UUID,
        allowNull: false
      },
      receiver: {
        type: DataTypes.UUID,
        allowNull: false
      },
      mediaType: {
        type: DataTypes.ENUM('image', 'none'),
        defaultValue: 'none',
        allowNull: true
      },
      mediaSource: {
        type: DataTypes.STRING,
        allowNull: true
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    });
  },

  async down (queryInterface) {
   
    await queryInterface.dropTable('messages');
  }
};
