module.exports = (sequelize, DataTypes) => {
    return sequelize.define('wallets', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        balance: DataTypes.BIGINT,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    })
}