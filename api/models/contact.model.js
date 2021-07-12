const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define("Contact", {
		// Model attributes are defined here
		type: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		nom: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		tel: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		adresse: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	},
	{
		timestamps: false,
	});
};