import { Sequelize } from 'sequelize';
import environmentDB from '../contants/environmentDB.js';

const sequelize = new Sequelize(environmentDB);

// Database initialization function
export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sync models to the database
    await sequelize.sync({ force: false, alter: false, logging: false });
    console.log(`DB_NAME & tables created!`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

export default sequelize;