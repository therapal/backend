module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'therapySessions',
        {
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
            participants: DataTypes.JSON,
            participantCount: DataTypes.INTEGER,
            status: DataTypes.ENUM('pending', 'active', 'inactive', 'failed'),
            sessionType: {
                type: DataTypes.ENUM('chat', 'video', 'audio'),
                allowNull: false
            },
            sessionTypeId: DataTypes.UUID
        }
    )
}