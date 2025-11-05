"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Use the queryInterface to run the raw SQL that creates the Users table
    await queryInterface.sequelize.query(`
  CREATE TABLE Users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );`
    );
  },

  async down (queryInterface, Sequelize) {
    // Revert by dropping the Users table
    await queryInterface.dropTable('Users');
  }
};
