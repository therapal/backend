module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Payments", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    /**
      BEFORE CONFIRMING A STATUS, CHECK THE PAYMENT GATEWAY TO KNOW THE STATUS
      */
    gateway_status: {
      type: DataTypes.ENUM(
        "pending",
        "success",
        "abandoned",
        "ongoing",
        "processing",
        "queued",
        "reversed",
        "failed"
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
    invoice_id: {
      type: DataTypes.UUID,
      references: {
        model: "Invoices",
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
