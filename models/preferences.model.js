module.exports = (sequelize, DataTypes) => {
    return sequelize.define( 'preferences', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        specialisations: DataTypes.JSON,
        gender: DataTypes.STRING,
        experienceLevel: DataTypes.STRING,
        language: DataTypes.STRING,
        therapyFormat: DataTypes.STRING,
        availability: DataTypes.JSON,
        minTherapistRating: DataTypes.INTEGER,
        clientId: {
            type: DataTypes.UUID,
            references: {
                model: 'clients',
                key: 'id'
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    });
}