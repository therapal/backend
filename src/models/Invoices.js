module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Invoices", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    /**
     * Invoice token is a JWT signed string that contains the values for payment.
     * This tokenization is done, the invoice is the only source of truth before a payment is made. The invoice token contain these
     */
    signed_invoice: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: "JWT signed string containing payment values",
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "ngn",
    },
  });
};
