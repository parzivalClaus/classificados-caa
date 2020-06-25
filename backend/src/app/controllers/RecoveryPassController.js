import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import User from '../models/User';

import RecoveryPassMail from '../jobs/RecoveryPassMail';
import NewPassMail from '../jobs/NewPassMail';
import Queue from '../../lib/Queue';

class RecoveryPassController {
  async store(req, res) {
    const { email } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (!userExists) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    await userExists.update({
      recoveryCode: crypto.randomBytes(8).toString('hex'),
    });

    await Queue.add(RecoveryPassMail.key, {
      name: userExists.name,
      email: userExists.email,
      recoveryCode: userExists.recoveryCode,
    });

    return res.json({ ok: 'Chave enviada com sucesso' });
  }

  async index(req, res) {
    const { email, code } = req.query;

    const userExists = await User.findOne({ where: { email } });

    if (!userExists) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    if (!(userExists.recoveryCode === code)) {
      return res
        .status(401)
        .json({ error: 'Este código de recuperação não é válido.' });
    }

    const userPass = crypto.randomBytes(6).toString('hex');
    const userPassHash = await bcrypt.hash(userPass, 8);

    await userExists.update({
      recoveryCode: null,
      password_hash: userPassHash,
    });

    await Queue.add(NewPassMail.key, {
      name: userExists.name,
      email: userExists.email,
      password: userPass,
    });

    return res.json(userPass);
  }
}

export default new RecoveryPassController();
