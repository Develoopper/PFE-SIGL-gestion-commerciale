const { sequelize, sequelize: { models: { Transfert } } } = require('../../server');

exports.index = async (req, res) => {
  try {
    const transferts = await Transfert.findAll({ attributes: { exclude: ['id'] } });
		res.status(201).json(transferts);
	} catch (e) {
    console.log("Error: " + e.message);
		res.status(400).json("Error: " + e.message);
	}
}

exports.store = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    await Transfert.destroy({ where: {}, transaction });
		const transferts = await Transfert.bulkCreate(req.body, { transaction });
    await transaction.commit();
		res.status(201).json(transferts);
	} catch (e) {
    await transaction.rollback();
		console.log("Error: " + e.message);
		res.status(400).json("Error: " + e.message);
	}
}