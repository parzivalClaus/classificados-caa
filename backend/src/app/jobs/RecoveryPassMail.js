import Mail from '../../lib/Mail';

class RecoveryPassMail {
  get key() {
    return 'RecoveryPassMail';
  }

  async handle({ data }) {
    const { name, email, recoveryCode } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Sua chave para recuperação de senha.',
      template: 'recoveryPass',
      context: {
        name,
        email,
        recoveryCode,
      },
    });
  }
}

export default new RecoveryPassMail();
