module.exports = (sequelize, DataTypes) => {
    return sequelize.define( 'preferences', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        specialisations: DataTypes.JSON, // array of ID referenced from "specialisations" table PK
        gender: {
            type: DataTypes.ENUM('male', 'female', 'neutral'),
            defaultValue: 'neutral'
        },
        experienceLevel: DataTypes.ENUM('experienced'),
        language: DataTypes.STRING,
        therapyFormat: DataTypes.ENUM('chat', 'video'),
        availability: DataTypes.JSON,
        minTherapistRating: DataTypes.INTEGER,
        clientId: {
            type: DataTypes.UUID,
            unique: true,
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