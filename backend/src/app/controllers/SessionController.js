import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from '../../config/auth';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro nos dados, por favor confira todos os campos' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    if (user.recoveryCode) {
      return res.status(401).json({
        error:
          'Você solicitou uma recuperação de senha, por favor confira sua caixa de e-mails',
      });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'A senha está incorreta' });
    }

    if (!user.active) {
      return res.status(401).json({
        error: 'Usuário aguardando ativação.',
      });
    }

    const { id, name, admin } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        admin,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
