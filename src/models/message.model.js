module.exports = (sequelize, DataTypes) => {
  return sequelize.define("messages", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    appointmentId: {
      type: DataTypes.UUID,
      references: {
        model: "appointments",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    chatAppointmentId: {
      type: DataTypes.UUID,
      references: {
        model: "chatAppointments",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    sender: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    receiver: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    mediaType: {
      type: DataTypes.ENUM("image", "none"),
      defaultValue: "none",
    },
    mediaSource: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
};
