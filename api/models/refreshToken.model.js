const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('RefreshToken', {
		token: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
	}, {
		timestamps: false
	});
}