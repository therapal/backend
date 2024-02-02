module.exports = (sequelize, DataTypes) => {
  return sequelize.define("chatAppointment", {
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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
};
