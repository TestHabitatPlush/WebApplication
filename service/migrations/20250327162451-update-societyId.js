module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Vehicles", "societyId", {
      type: Sequelize.INTEGER.UNSIGNED, // Ensure it matches customerId
      allowNull: true,
      references: {
        model: "customers",
        key: "customerId",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Vehicles", "societyId", {
      type: Sequelize.INTEGER,
    });
  },
};
