const { sequelize, sequelize: { models: { Caisse } } } = require('../../server');

exports.index = async (req, res) => {
  try {
    const caisse = await Caisse.findOne({ 
			attributes: { exclude: ['id'] } 
		});
		res.status(201).json(caisse);
	} catch (e) {
    console.log("Error: " + e.message);
		res.status(400).json("Error: " + e.message);
	}
}

exports.store = async (req, res) => {
	const transaction = await sequelize.transaction();
  try {
		await Caisse.destroy({ where: {}, transaction });
		const caisse = await Caisse.create(req.body, { transaction });
		await transaction.commit();
		res.status(201).json(caisse);
	} catch (e) {
		await transaction.rollback();
		console.log("Error: " + e.message);
		res.status(400).json("Error: " + e.message);
	}
}