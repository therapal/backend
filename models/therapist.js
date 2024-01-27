module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'therapists',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.STRING,
                defaultValue: 'therapist'
            },
            categories: DataTypes.JSON
        }
    )
};