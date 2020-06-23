import Mail from '../../lib/Mail';

class CreateUserMail {
  get key() {
    return 'CreateUserMail';
  }

  async handle({ data }) {
    const { name, email, activeCode } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Seu link de ativação',
      template: 'createUser',
      context: {
        name,
        email,
        activeCode,
      },
    });
  }
}

export default new CreateUserMail();
