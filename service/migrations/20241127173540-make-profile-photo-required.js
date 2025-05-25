// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add altering commands here.
//      *
//      * Example:
//      * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
//      */
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add reverting commands here.
//      *
//      * Example:
//      * await queryInterface.dropTable('users');
//      */
//   }
// };

"use strict";

/** @type {import('sequelize-cli').Migration} */
 module.exports = {
  async up(queryInterface, Sequelize) {
    // Adding new columns resetToken and resetTokenExpiration to the users table
    await queryInterface.addColumn("users", "resetToken", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("users", "resetTokenExpiration", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Removing the added columns if migration is rolled back
    await queryInterface.removeColumn("users", "resetToken");
    await queryInterface.removeColumn("users", "resetTokenExpiration");
  }
};
