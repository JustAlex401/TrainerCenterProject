
const roleCr = (sequelize, Sequelize) => {

    const Role = sequelize.define("role", {
        
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        role: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['id']
            }
        ]
    }
    );

    return Role;

}

module.exports = {
    roleCr
}



