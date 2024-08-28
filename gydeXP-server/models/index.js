const sequelize = require("../config/db");
const User = require("./userModel");

const initDb = async () => {
  try {
    await sequelize.sync();
    console.log("Database & tables created!");
  } catch (err) {
    console.error("Error creating database:", err);
  }
};

module.exports = {
  initDb,
  User,
};
