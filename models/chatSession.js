module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'chatSessions',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            therapySessionId: {
                type: DataTypes.UUID,
                references: {
                    model: 'therapySessions',
                    key: 'id'
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            chats: DataTypes.JSON
        }
    )
}