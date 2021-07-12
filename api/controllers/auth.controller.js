const { redisClient, sequelize: { models: { User, RefreshToken } } } = require('../../server');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
	try {
		const { username, password } = req.body;

		// create user
		const { id: userId } = await User.create({ username, password });

		// create access & refresh token
		const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXP_IN + 's' });
		const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET);
		
		// store refresh token in the database
		await RefreshToken.create({ token: refreshToken, UserId: userId })
		// store refresh token in the cache
		await redisClient.setAsync('refresh:' + userId + ':' + refreshToken, userId);
		
		// send back the tokens
		res.status(200).json({ username, accessToken, refreshToken });
	} catch (e) {
		console.log("Error: " + e);
		res.status(400).json(e.message);
	}
}

exports.login = async (req, res) => {
	try {
		const { username, password } = req.body;

		// find user by username & password
		const { id: userId } = await User.findByCredentials(username, password);

		// create access & refresh token
		const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXP_IN + 's' });
		const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET);

		// store refresh token in the database
		await RefreshToken.create({ token: refreshToken, UserId: userId });
		// store refresh token in the cache
		await redisClient.setAsync('refresh:' + userId + ':' + refreshToken, userId);

		// send back the tokens
		res.status(200).json({ username, accessToken, refreshToken });
	} catch (e) {
		console.log("Error: " + e.message);
		res.status(400).json(e.message);
	}
}

exports.refresh = async (req, res) => {
  try {
		const { refreshToken } = req.body;

		// verify if refresh token is provided
		if (!refreshToken) 
			return res.status(401).json("Error: refreshToken token not provided !");

		// verify signature and expiration date
		const { userId } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

		// verify if the provided refresh token exists in the cache
		const data = await redisClient.getAsync('refresh:' + userId + ':' + refreshToken);
		if (!data)
			return res.status(401).json("Error: refresh token doesn't exist !");

		// create a new access token
		const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXP_IN + 's' });

		// send back the token
		res.status(200).json(accessToken);
	} catch (e) {
		console.log("Error: " + e.message);
		res.status(401).json("Error: " + e.message);
	}
}

exports.logout = async (req, res) => {
	try {
		const { userId, accessToken, accessTokenExp, body: { refreshToken } } = req;

		// verify if refresh token is provided
		if (!refreshToken) 
			return res.status(400).json("Error: refresh token not provided !");

		// verify if the provided refresh token exists in the cache
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

		// remove refresh token from the database
		await RefreshToken.destroy({ where: { token: refreshToken } });
		// remove refresh token from the cache
		const isDeleted = await redisClient.delAsync('refresh:' + userId + ':' + refreshToken);
		if (!isDeleted)
			return res.status(400).json("Error: refresh token doesn't exist !");

		// set access token to the black list
		await redisClient.setexAsync('blacklist:' + accessToken, Math.floor(accessTokenExp - new Date().getTime() / 1000), userId);

		res.status(200).json('logout successful !');
	} catch (e) {
		console.log("Error: " + e);
		res.status(400).json("Error: " + e);
	}
}

exports.globalLogout = async (req, res) => {
	try {
		const { userId, accessToken, accessTokenExp, body: { refreshToken } } = req;

		// verify if refresh token is provided
		if (!refreshToken) 
			return res.status(400).json("Error: refresh token not provided !");

		// verify if the provided refresh token exists in the cache
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

		// remove all user's refresh tokens from the database
		await RefreshToken.destroy({ where: { UserId: userId } });
		// remove all user's refresh tokens from the cache
		const rows = await redisClient.keysAsync('refresh:' + userId + ':*');
		if (!rows)
			return res.status(400).json("Error: refresh token doesn't exist !");
		rows.map(async key => await redisClient.delAsync(key));

		// set access token to the black list
		await redisClient.setexAsync('blacklist:' + accessToken, Math.floor(accessTokenExp - new Date().getTime() / 1000), userId);

		// set the user's last global logout date
		await redisClient.setAsync('lastGlobalLogout:' + userId, Math.floor(new Date().getTime() / 1000));

		res.status(200).json('global logout successful !');
	} catch (e) {
		console.log("Error: " + e.message);
		res.status(400).json("Error: " + e.message);
	}
}

exports.getMe = async (req, res) => {
	res.status(200).json(req.user);
}

exports.resume = async (req, res) => {
	try {
		const { userId } = req;
		const { username } = await User.findByPk(userId);
		res.status(200).json(username);
	} catch (e) {
		console.log("Error: " + e.message);
		res.status(400).json(e.message);		
	}
}