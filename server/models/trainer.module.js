
const trainerCr = (sequelize, Sequelize) => {

    const Trainer = sequelize.define("trainer", {
        
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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



