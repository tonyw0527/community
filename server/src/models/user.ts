const user = (sequelize: any, DataTypes: any) => {
  return sequelize.define('user', {
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    provider: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: 'local'
    },
  }, {
    sequelize,
    timestamps: true,
    underscored: false,
    modelName: 'User',
    tableName: 'users',
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  })
};

export default user;