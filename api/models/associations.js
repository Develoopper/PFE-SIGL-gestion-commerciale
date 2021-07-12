module.exports = (sequelize) => {
	const { User, RefreshToken } = sequelize.models;
  
	User.hasMany(RefreshToken);
	RefreshToken.belongsTo(User);
}