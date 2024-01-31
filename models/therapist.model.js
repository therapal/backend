module.exports = (sequelize, DataTypes) => {
    return sequelize.define('therapists', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        gender: DataTypes.ENUM('male', 'female', 'neutral'),
        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'id'
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        specialisations: DataTypes.JSON,
    })
};