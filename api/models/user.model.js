const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
// const RefreshToken = require('../models/refreshToken.model');

module.exports = (sequelize) => {
	const User = sequelize.define('User', {
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	}, {
		timestamps: false
	});

	// add methods to the model
	User.findByCredentials = async (username, password) => {
		const user = await User.findOne({ where: { username } });
		if (!user)
			throw new Error("Utilisateur introuvable !");
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			throw new Error("Mot de passe incorrecte !");
		return user;
	}

	User.beforeCreate(async (user) => {
		user.password = await bcrypt.hash(user.password, 8);
	});	
}

// userSchema.methods.toJSON = () => {
// 	const user = this.toObject();
// 	delete user.password;
// 	delete user.token;
// 	return user;
// }

// userSchema.methods.generateAuthToken = async () => {
// 	const user = this;
// 	const token = await jwt.sign({ _id: user._id.toString() }, 'tokenKey');
// 	return token;
// }

// userSchema.statics.findByCredentials = async (email, password) => {
// 	try {
// 		const user = await User.findOne({ email });
// 		if (!user)
// 			throw new Error();
// 		const isMatch = await bcrypt.compare(password, user.password);
// 		if (!isMatch)
// 			throw new Error();
// 		return user;
// 	} catch (e) {
// 		return "Unable to login";
// 	}
// }

// userSchema.pre('save', async next => {
// 	const user = this;
// 	if (user.isModified('password')) {
// 		user.password = await bcrypt.hash(user.password, 8);
// 	}

// 	if (await User.findOne({ email: user.email }))
// 		next(new Error("Email existe dejà"));
// 	else
// 		next();
// })

// userSchema.pre('remove', async next => {
// 	const user = this;
// 	await Tasks.remove({ owner: require.user._id });
// 	next();
// })

// const User = mongoose.model('user', userSchema);

// email: {
//     type: String,
//     required: true,
//     validate(value) {
//         if (!validator.isEmail(value)) {
//             throw new Error('Email is in valid')
//         }
//     },
//     trim: true
// },