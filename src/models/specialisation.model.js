module.exports = (sequelize, DataTypes) => {
    return sequelize.define('therapistSpecialisations', {
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
        categoryId: {
            type: DataTypes.UUID,
            references: {
                model: 'categories',
                key: 'id'
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        updatedAt: DataTypes.DATE,
        createdAt: DataTypes.DATE,
    })
};