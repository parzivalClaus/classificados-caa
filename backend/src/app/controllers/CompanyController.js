import * as Yup from 'yup';
import Category from '../models/Category';
import Company from '../models/Company';
import File from '../models/File';

import Mail from '../../lib/Mail';

class CompanyController {
  async index(req, res) {
    const { categoryId, companyId } = req.params;

    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(400).json({ error: 'Não existe esta categoria' });
    }

    if (companyId) {
      const company = await Company.findByPk(companyId, {
        include: [
          {
            model: File,
            as: 'logo',
            attributes: ['name', 'path', 'url'],
          },
        ],
      });

      if (!company) {
        return res.status(400).json({ error: 'Não existe esta empresa' });
      }
      return res.json(company);
    }

    const companies = await Company.findAndCountAll({
      where: {
        category: category.name,
      },
      include: [
        {
          model: File,
          as: 'logo',
          attributes: ['name', 'path', 'url'],
        },
      ],
      order: [['name', 'ASC']],
    });

    return res.json(companies);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      active: Yup.boolean().required(),
      category: Yup.string().required(),
      name: Yup.string().required(),
      phone: Yup.string(),
      whatsapp: Yup.string(),
      email: Yup.string(),
      website: Yup.string(),
      instagram: Yup.string(),
      facebook: Yup.string(),
      number: Yup.string(),
      street: Yup.string(),
      district: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      zipcode: Yup.string(),
      description: Yup.string(),
      discount: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro nos dados, por favor confira todos os campos' });
    }

    const result = await Company.create(req.body);

    await Mail.sendMail({
      to: 'Classificados C.A.A. <contato@classificadoscaa.com.br>',
      subject: 'Nova empresa aguardando ativação',
      text: 'Há uma nova empresa aguardando ativação.',
    });

    return res.json(result);
  }
}

export default new CompanyController();
