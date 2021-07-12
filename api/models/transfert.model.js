const { DataTypes } = require('sequelize');
const moment = require("moment");

module.exports = (sequelize) => {
	sequelize.define("Transfert", {
		// Model attributes are defined here
		type: {
			type:  DataTypes.STRING,
			allowNull: false,
		},
		date: {
			type:  DataTypes.DATEONLY,
			allowNull: false,
			set(value) {
				this.setDataValue("date", moment(value, "DD/MM/YYYY").format('YYYY-MM-DD'));
				// this.setDataValue("date", value.split("/").reverse().join("-"));
			},
			get() {
				return moment(this.getDataValue("date"), "YYYY-MM-DD").format('DD/MM/YYYY');
			}
		},
		option: {
			type:  DataTypes.STRING,
			allowNull: false,
		},
		montant: {
			type:  DataTypes.FLOAT(8, 2),
			allowNull: false,
		}
	},
	{
		timestamps: false,
	});
};