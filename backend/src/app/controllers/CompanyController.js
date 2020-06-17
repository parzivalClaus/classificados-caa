import * as Yup from 'yup';
import Company from '../models/Company';

class CompanyController {
  async store(req, res) {
    const schema = Yup.object().shape({
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

    return res.json(result);
  }
}

export default new CompanyController();
