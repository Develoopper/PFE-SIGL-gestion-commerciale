require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const { Sequelize } = require("sequelize");
const send = require('./mailing');
const redis = require("redis");
const { promisifyAll } = require('bluebird');

const entities = [
	'caisse',
	'vente',
	'achat',
	'contact',
	'user',
	'transfert'
]

// setup redis
promisifyAll(redis);
const redisClient = redis.createClient();
redisClient.on("error", console.log);

exports.redisClient = redisClient;

// const sequelize = new Sequelize("heroku_28ffe4b606bfc08", "b95ebf9c893be3", "18625452", {
// 	host: "eu-cdbr-west-03.cleardb.net",
// 	dialect: "mysql",
// 	port: "3306",
// 	logging: console.log,
// });

// setup sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.NODE_ENV === "production" ? 'ppp.sqlite' : 'ppp-dev.sqlite',
})

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// define all models
require('./api/models/refreshToken.model')(sequelize);
entities.map(entitie => {
	require('./api/models/' + entitie + '.model')(sequelize);
})

exports.sequelize = sequelize;

// use all routers
app.use('/api/auth', require('./api/routers/auth.router'));
entities.map(entitie => {
	const router = require('./api/routers/' + entitie + '.router');
	app.use('/api', router);
})

// apply all associations
require('./api/models/associations')(sequelize);

// serve the spa if the requested route do not begin with /api
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	})
}

(async () => {
	try {
		// test the connection by trying to authenticate
		await sequelize.authenticate();
		// sync all defined models to the DB
		await sequelize.sync();
		console.log("Connection has been established successfully.");

		// // load refresh tokens from database to cache
		// const refreshTokens = sequelize.models.RefreshToken.findAll();
		// refreshTokens.map(async refreshToken => {
		// 	await redisClient.setAsync('refresh:' + refreshToken.userId + ':' + refreshToken.token, refreshToken.userId);
		// })
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
})()

// listen to incoming requests
app.listen(process.env.PORT || 3030, () => console.log("Listening..."));