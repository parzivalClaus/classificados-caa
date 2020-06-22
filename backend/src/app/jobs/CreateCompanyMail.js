import Mail from '../../lib/Mail';

class CreateCompanyMail {
  get key() {
    return 'CreateCompanyMail';
  }

  async handle({ data }) {
    const { result } = data;

    await Mail.sendMail({
      to: 'Classificados C.A.A. <contato@classificadoscaa.com.br>',
      subject: 'Nova empresa aguardando ativação',
      template: 'createCompany',
      context: {
        companyName: result.name,
      },
    });
  }
}

export default new CreateCompanyMail();
