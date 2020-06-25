import Mail from '../../lib/Mail';

class NewPassMail {
  get key() {
    return 'NewPassMail';
  }

  async handle({ data }) {
    const { name, email, password } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Sua nova senha.',
      template: 'newPass',
      context: {
        name,
        password,
      },
    });
  }
}

export default new NewPassMail();
