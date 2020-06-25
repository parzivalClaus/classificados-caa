import User from '../models/User';

class ActiveUserController {
  async index(req, res) {
    const { email, code } = req.query;

    const userExists = await User.findOne({ where: { email } });

    if (!userExists) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    if (!(userExists.activeCode === code)) {
      return res
        .status(401)
        .json({ error: 'Este código de ativação não é válido.' });
    }

    if (userExists.active) {
      return res.status(401).json({ error: 'Este usuário já está ativo' });
    }

    await userExists.update({ active: true, activeCode: null });

    return res.json({ ok: 'Usuário ativado com sucesso!' });
  }
}

export default new ActiveUserController();
