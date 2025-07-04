module.exports = (sequelize, DataTypes) => {
  const Interview = sequelize.define("Interview", {
    topics: { type: DataTypes.TEXT, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    experience: { type: DataTypes.INTEGER, allowNull: false },
    techStack: { type: DataTypes.TEXT, allowNull: false },
    rollNumber: { type: DataTypes.STRING, allowNull: false },
  });

  Interview.associate = (models) => {
    Interview.belongsToMany(models.User, {
      through: "UserInterviews",
      foreignKey: "interviewId",
      otherKey: "userId",
    });
  };

  return Interview;
};
