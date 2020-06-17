import User from '../models/User';

class ActiveUserController {
  async store(req, res) {
    const { email, activeCode } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (!userExists) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    if (!(userExists.activeCode === activeCode)) {
      return res
        .status(401)
        .json({ error: 'Este código de ativação não é válido.' });
    }

    if (userExists.active) {
      return res.status(401).json({ error: 'Este usuário já está ativo' });
    }

    await userExists.update({ active: true });

    return res.json();
  }
}

export default new ActiveUserController();
