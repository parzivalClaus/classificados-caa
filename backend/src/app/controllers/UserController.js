import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      registration: Yup.number().min(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro nos dados, por favor confira todos os campos' });
    }

    const emailExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (emailExists) {
      return res.status(400).json({ error: 'Este e-mail já foi cadastrado' });
    }

    const registrationExists = await User.findOne({
      where: { registration: req.body.registration },
    });

    if (registrationExists) {
      return res
        .status(400)
        .json({ error: 'Esta matrícula já está cadastrada' });
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
