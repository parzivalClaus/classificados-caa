import * as Yup from 'yup';
import { Op } from 'sequelize';
import User from '../models/User';

import CreateUserMail from '../jobs/CreateUserMail';
import Queue from '../../lib/Queue';

class UserController {
  async index(req, res) {
    const { userId } = req.params;
    const { q } = req.query;
    const name = q || '';

    if (userId) {
      const user = await User.findByPk(userId);
      return res.json(user);
    }

    const users = await User.findAndCountAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      order: [['name', 'ASC']],
    });
    return res.json(users);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      confirmPassword: Yup.string().required().min(6),
      registration: Yup.number().min(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro nos dados, por favor confira todos os campos.' });
    }

    const {
      admin,
      active,
      name,
      email,
      password,
      confirmPassword,
      registration,
    } = req.body;

    const emailExists = await User.findOne({
      where: { email },
    });

    if (emailExists) {
      return res.status(400).json({ error: 'Este e-mail já foi cadastrado.' });
    }

    const registrationExists = await User.findOne({
      where: { registration },
    });

    if (registrationExists) {
      return res
        .status(400)
        .json({ error: 'Esta matrícula já está cadastrada.' });
    }

    if (!(password === confirmPassword)) {
      return res.status(400).json({
        error: 'As senhas digitadas não conferem.',
      });
    }

    const { id, activeCode } = await User.create(req.body);

    await Queue.add(CreateUserMail.key, { name, email, activeCode });

    return res.json({
      id,
      name,
      email,
      admin,
      active,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erros de validação, confira os dados.' });
    }

    const { userId } = req;
    const { id } = req.params;
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(userId);
    const targetUser = await User.findByPk(id);

    if (!user.admin && +id !== +userId) {
      return res.status(401).json({
        error: 'Usuário não autorizado',
      });
    }

    if (email !== targetUser.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res
          .status(400)
          .json({ error: 'Já existe um usuário com este endereço de e-mail.' });
      }
    }

    if (oldPassword && !(await targetUser.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'A senha antiga está incorreta.' });
    }

    try {
      const { name, registration } = await targetUser.update(req.body);

      return res.json({ name, registration, email });
    } catch (err) {
      return res.json(err);
    }
  }
}

export default new UserController();
