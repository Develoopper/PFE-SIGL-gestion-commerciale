const { DataTypes } = require('sequelize');
const moment = require("moment");

module.exports = (sequelize) => {
	sequelize.define("Vente", {
		// Model attributes are defined here
		date: {
			// type: DataTypes.DATEONLY,
			type: DataTypes.STRING,
			allowNull: true,
			// set(value) {
			// 	this.setDataValue("date", moment(value, "DD/MM/YYYY").format('YYYY-MM-DD'));
			// 	// this.setDataValue("date", value.split("/").reverse().join("-"));
			// },
			// get() {
			// 	return moment(this.getDataValue("date"), "YYYY-MM-DD").format('DD/MM/YYYY');
			// }
		},
		commercial: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		nDeBon: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		nDeFacture: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		ca: {
			type: DataTypes.FLOAT(8, 2),
			allowNull: true,
			set(value) {
				this.setDataValue("ca", Number(value));
			},
		},
		encaisse: {
			type: DataTypes.FLOAT(8, 2),
			allowNull: true,
			set(value) {
				this.setDataValue("encaisse", Number(value));
			},
		},
		reste: {
			type: DataTypes.FLOAT(8, 2),
			allowNull: true,
			set(value) {
				this.setDataValue("reste", Number(value));
			},
		},
		espece: {
			type: DataTypes.FLOAT(8, 2),
			allowNull: true,
			set(value) {
				this.setDataValue("espece", Number(value));
			},
		},
		cheque: {
			type: DataTypes.FLOAT(8, 2),
			allowNull: true,
			set(value) {
				this.setDataValue("cheque", Number(value));
			},
		},
		tpe: {
			type: DataTypes.FLOAT(8, 2),
			allowNull: true,
			set(value) {
				this.setDataValue("tpe", Number(value));
			},
		},
		virement: {
			type: DataTypes.FLOAT(8, 2),
			allowNull: true,
			set(value) {
				this.setDataValue("virement", Number(value));
			},
		},
		client: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		timestamps: false,
	});
}; 