const { sequelize: { models: { User } } } = require('../../server');

exports.index = async (req, res) => {
  try {
		const user = await User.findAll({ attributes: { exclude: ['id'] } });
		res.status(201).json(user);
	} catch (e) {
		console.log("Error: " + e.message);
		res.status(400).json("Error: " + e.message);
	}
}

exports.show = async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		res.status(201).json(user);
	} catch (e) {
		console.log("Error: " + e.message);
		res.status(400).json("Error: " + e.message);
	}
}

exports.store = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.create({ username, password });
		res.status(200).json(user);
	} catch (e) {
		console.log("Error: " + e);
		res.status(400).json(e);
	}
}

exports.update = async (req, res) => {
  try {
    const user = await User.update(req.body, { where: { id: req.params.id } });
		res.status(201).json(user);
	} catch (e) {
		console.log("Error: " + e.message);
		res.status(400).json("Error: " + e.message);
	}
}

exports.destroy = async (req, res) => {
  try {
		const user = await User.destroy({ where: { id: req.params.id } });
		res.status(201).json(user);
	} catch (e) {
		console.log("Error: " + e.message);
		res.status(400).json("Error: " + e.message);
	}
}