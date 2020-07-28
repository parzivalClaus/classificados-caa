import User from '../models/User';

class ActiveUserController {
  async index(req, res) {
    const { email, code } = req.query;
    if (!email || !code) {
      return res
        .status(401)
        .json({ error: 'Este código de ativação não é válido ' });
    }

    const userExists = await User.findOne({ where: { email } });

    if (!userExists) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    if (userExists.active) {
      return res.status(401).json({ error: 'Este usuário já está ativo' });
    }

    if (!(userExists.activeCode === code)) {
      return res
        .status(401)
        .json({ error: 'Este código de ativação não é válido.' });
    }

    await userExists.update({ active: true, activeCode: null });

    return res.json({ ok: 'Usuário ativado com sucesso!' });
  }
}

export default new ActiveUserController();
