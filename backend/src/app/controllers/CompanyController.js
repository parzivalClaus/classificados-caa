import * as Yup from 'yup';
import Category from '../models/Category';
import Company from '../models/Company';
import File from '../models/File';
import User from '../models/User';

import CreateCompanyMail from '../jobs/CreateCompanyMail';
import UserUpdateCompanyMail from '../jobs/UserUpdateCompanyMail';
import AdminUpdateCompanyMail from '../jobs/AdminUpdateCompanyMail';
import Queue from '../../lib/Queue';

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

    try {
      const result = await Company.create(req.body);

      await Queue.add(CreateCompanyMail.key, { result });

      return res.json(result);
    } catch (err) {
      return res.json({ error: err });
    }
  }

  async update(req, res) {
    const { userId } = req;
    const { companyId } = req.params;

    const { admin } = await User.findByPk(userId);

    const company = await Company.findByPk(companyId, {
      include: {
        model: User,
        as: 'creator',
        attributes: ['id', 'name', 'admin', 'email'],
      },
    });

    if (!admin) {
      if (company.creator.id !== userId) {
        return res.status(401).json({ error: 'Usuário não autorizado.' });
      }

      await company.update({ active: false, ...req.body });

      await Queue.add(UserUpdateCompanyMail.key, { company });

      return res.json(company);
    }

    await company.update({ active: true, ...req.body });

    await Queue.add(AdminUpdateCompanyMail.key, { company });

    return res.json(company);
  }

  async delete(req, res) {
    const { companyId } = req.params;

    const company = await Company.findByPk(companyId);

    if (!company) {
      return res.status(400).json({ error: 'Esta empresa não existe' });
    }

    await Company.destroy({
      where: {
        id: companyId,
      },
    });

    return res.json({ companyId });
  }
}

export default new CompanyController();
