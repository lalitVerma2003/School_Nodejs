// models/location.js
import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const School = sequelize.define('School', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
}, {
  tableName: 'schools', 
  timestamps: false,      
});

export default School;
