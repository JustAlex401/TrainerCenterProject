
const trainerCr = (sequelize, Sequelize) => {

    const Trainer = sequelize.define("trainer", {
        
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        character: {
            type: Sequelize.STRING(2056),
            allowNull: false,
        },

        age: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        weight: {
            type: Sequelize.INTEGER,
            allowNull: false,
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

    return Trainer;

}

module.exports = {
    trainerCr
}



