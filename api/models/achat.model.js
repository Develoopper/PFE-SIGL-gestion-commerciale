const { DataTypes } = require('sequelize');
const moment = require("moment");

module.exports = (sequelize) => {
	sequelize.define("Achat", {
		// Model attributes are defined here
		date: {
			// type: DataTypes.DATEONLY,
			type: DataTypes.STRING,
			allowNull: true,
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
		fournisseur: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		timestamps: false,
	});
};