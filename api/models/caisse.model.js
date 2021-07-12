const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define("Caisse", {
		// Model attributes are defined here
		espece: {
			type:  DataTypes.FLOAT(8, 2),
			allowNull: false,
		},
		cheque: {
			type:  DataTypes.FLOAT(8, 2),
			allowNull: false,
		},
		tpe: {
			type:  DataTypes.FLOAT(8, 2),
			allowNull: false,
		},
		virement: {
			type:  DataTypes.FLOAT(8, 2),
			allowNull: false,
		}
	},
	{
		timestamps: false,
	});
};