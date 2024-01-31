module.exports = (sequelize, DataTypes) => {
    return sequelize.define( 'appointments', {
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
        clientId: {
            type: DataTypes.UUID,
            references: {
                model: 'clients',
                key: 'id'
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        status: DataTypes.ENUM('pending', 'active', 'inactive', 'declined'),
        clientRating: DataTypes.INTEGER,
        outcome: DataTypes.TEXT,
        therapistReview: DataTypes.TEXT,
        appointmentTypeId: DataTypes.UUID,
        followUpRecommendation: DataTypes.TEXT,
        timestamp: DataTypes.DATE,
        durationMinutes: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    });
}