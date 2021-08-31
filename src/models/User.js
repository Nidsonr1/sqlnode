const { Model, DataTypes } = require('sequelize');
require('dotenv').config()
class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    }, {
      sequelize
    })
  };

  async checkUserAlready(data) {
    const userAlready = await User.findOne({ where: { email: data.email } });
    if(!userAlready) return;
    return userAlready;
  }

  async register(data) {
    const { name, email, password } = data;

    const user = await User.create({ name, email, password });

    return user;
  }

  async login(data) {
    const user = await User.findOne({
      where: {
        email: data.email,
        password: data.password
      }
    });

    if(!user) return;
    return user;
  };

  async listUsers() {
    const users = await User.findAll();
    
    if(!users) return;
    return users;
  }
};

module.exports = User;