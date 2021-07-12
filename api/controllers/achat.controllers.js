const { sequelize, sequelize: { models: { Achat } } } = require('../../server');

exports.index = async (req, res) => {
  try {
		const achats = await Achat.findAll({ attributes: { exclude: ['id'] } });
		res.status(201).json(achats);
	} catch (e) {
		console.log("Error: " + e.message);
		res.status(400).json("Error: " + e.message);
	}
}

exports.store = async (req, res) => {
	const transaction = await sequelize.transaction();
  try {
		await Achat.destroy({ where: {}, transaction });
		const achats = await Achat.bulkCreate(req.body, { transaction });
		await transaction.commit();
		res.status(201).json(achats);
	} catch (e) {
		await transaction.rollback();
		console.log("Error: " + e.message);
		res.status(400).json("Error: " + e.message);
	}
}