import * as Yup from 'yup';
import User from '../models/User';

class ActiveUserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      activeCode: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro nos dados, por favor confira todos os campos' });
    }

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
