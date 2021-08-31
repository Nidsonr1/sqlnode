const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const userModel = new User();
    const { name, email, password } = req.body;

    const userAlready = await userModel.checkUserAlready({ email });
    if(userAlready) return res.json({ error: 'already registered user' });

    const user = await userModel.register({ name, email, password });
    
    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    });
  },

  async login(req, res) {
    const userModel = new User();
    const { email, password } = req.body;

    const userAlready = await userModel.checkUserAlready({ email });
    if(!userAlready) return res.status(404).json({ error: 'User not Found' });

    const user = await userModel.login({ email, password });
    if(!user) return res.status(403).json({ error: 'Password incorrect!' });

    return res.status(200).json({ 
      success: `Bem-vindo(a) ${user.name}`
     });
  },

  async index(req, res) {
    const userModel = new User();
    const users = await userModel.listUsers();
    
    if(users.length == 0) return res.status(404).json({ error: 'Users not Found' });

    return res.status(200).json(users);
  }
}