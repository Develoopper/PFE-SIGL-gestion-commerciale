const { redisClient } = require('../../server');
const jwt = require("jsonwebtoken");

const verifyAccessToken = async (req, res, next) => {
	try {
		// verify if access token is provided
		const accessToken = req.header("Authorization").replace('Bearer ', '');
		if (!accessToken)
			return res.status(401).json("Error: no token provided !");

		// verify signature and expiration date
		const { userId, exp, iat } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

		// attach token data to the request
		req.userId = userId;
		req.accessToken = accessToken;
		req.accessTokenExp = Number(exp);

		// verify if the token was issued before the last global logout
		const lastGlobalLogout = await redisClient.getAsync('lastGlobalLogout:' + userId);
		if (lastGlobalLogout)
			if (Number(iat) < Number(lastGlobalLogout))
				return res.status(401).json('Error: you have to log in !');
		
		// verify if the token is in the blacklist
		const blacklistedAccessToken = await redisClient.getAsync('blacklist:' + accessToken);	
		if (blacklistedAccessToken)
			return res.status(401).json('Error: you have to log in !');
			
		// call the next middleware/controller & pass the req & res objects
		next();
	} catch (e) {
		console.log("Error: authentication failed !", e);
		res.status(403).json("Error: authentication failed !");
	}
}

module.exports = verifyAccessToken;