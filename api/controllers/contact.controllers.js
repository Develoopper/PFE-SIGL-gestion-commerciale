const { sequelize, sequelize: { models: { Contact } } } = require('../../server');

exports.index = async (req, res) => {
  try {
		const contacts = await Contact.findAll({ 
			attributes: { exclude: ['id'] } 
		});
		res.status(201).json(contacts);
	} catch (e) {
		console.log("Error: " + e.message);
		res.status(400).json("Error: " + e.message);
	}
}

exports.store = async (req, res) => {
	const transaction = await sequelize.transaction();
  try {
		await Contact.destroy({ where: {}, transaction });
		const contacts = await Contact.bulkCreate(req.body, { transaction });
		await transaction.commit();
		res.status(201).json(contacts);
	} catch (e) {
		await transaction.rollback();
		console.log("Error: " + e.message);
		res.status(400).json("Error: " + e.message);
	}
}