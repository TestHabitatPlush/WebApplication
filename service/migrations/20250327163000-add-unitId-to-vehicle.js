'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('vehicle', 'unitId', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'unit',
                key: 'unitId'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('vehicle', 'unitId');
    }
};
