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
        timestamp: DataTypes.DATE, // appointment date
        status: DataTypes.ENUM('pending', 'active', 'inactive', 'declined'),
        outcome: DataTypes.TEXT,
        notes: DataTypes.TEXT,
        appointmentFormat: DataTypes.ENUM('chat', 'video'),
        appointmentFormatId: DataTypes.UUID,
        followUpRecommendation: DataTypes.TEXT,
        durationMinutes: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    });
}