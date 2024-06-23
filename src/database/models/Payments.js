module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Payments", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    gateway_status: {
      type: DataTypes.ENUM(
        "pending",
        "success",
        "abandoned",
        "ongoing",
        "processing",
        "queued",
        "reversed",
        "failed",
      ),
      defaultValue: "pending",
    },
    payment_gateway: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "paystack",
    },
    transaction_reference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billing_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billing_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billing_city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billing_state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billing_zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billing_country: {
      type: DataTypes.STRING,
      allowNull: false,
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
    appointment_id: {
      type: DataTypes.UUID,
      references: {
        model: "Appointments",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    additional_info: DataTypes.JSON,
  });
};
