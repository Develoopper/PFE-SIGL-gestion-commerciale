const { sequelize, sequelize: { models: { Vente } } } = require('../../server');

exports.index = async (req, res) => {
  try {
		const ventes = await Vente.findAll({ attributes: { exclude: ['id'] } });
		res.status(201).json(ventes);
	} catch (e) {
		console.log("Error: " + e.message);
		res.status(400).json("Error: " + e.message);
	}
}

exports.store = async (req, res) => {
	const transaction = await sequelize.transaction();
	try {
		await Vente.destroy({ where: {}, transaction });
		const ventes = await Vente.bulkCreate(req.body, { transaction });
		await transaction.commit();
		res.status(201).json(ventes);
	} catch (e) {
		await transaction.rollback();
		console.log("Error: " + e.message);
		res.status(400).json("Error: " + e.message);
	}
}