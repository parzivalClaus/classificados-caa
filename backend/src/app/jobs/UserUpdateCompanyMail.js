import Mail from '../../lib/Mail';

class UserUpdateCompanyMail {
  get key() {
    return 'UserUpdateCompanyMail';
  }

  async handle({ data }) {
    const { company } = data;

    await Mail.sendMail({
      to: 'Classificados C.A.A. <contato@classificadoscaa.com.br>',
      subject: 'Uma empresa foi atualizada - Aguardando aprovação',
      template: 'userUpdateCompany',
      context: {
        companyName: company.name,
      },
    });
  }
}

export default new UserUpdateCompanyMail();
