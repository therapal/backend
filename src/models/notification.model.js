module.exports = (sequelize, DataTypes) => {
  return sequelize.define("notifications", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    ownerRole: {
      type: DataTypes.ENUM("therapist", "client", "admin"),
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    type: DataTypes.ENUM("appointment"),
    read: DataTypes.BOOLEAN,
    content: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
};
