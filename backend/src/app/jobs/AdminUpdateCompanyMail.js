import Mail from '../../lib/Mail';

class AdminUpdateCompanyMail {
  get key() {
    return 'AdminUpdateCompanyMail';
  }

  async handle({ data }) {
    const { company } = data;

    await Mail.sendMail({
      to: `${company.creator.name} <${company.creator.email}>`,
      subject: 'Sua empresa foi aprovada e está disponível',
      template: 'adminUpdateCompany',
      context: {
        creatorName: company.creator.name,
        companyName: company.name,
      },
    });
  }
}

export default new AdminUpdateCompanyMail();
