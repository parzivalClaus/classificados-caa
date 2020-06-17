import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'Este e-mail já foi cadastrado' });
    }

    const { id, name, email, admin, active } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      admin,
      active,
    });
  }
}

export default new UserController();
