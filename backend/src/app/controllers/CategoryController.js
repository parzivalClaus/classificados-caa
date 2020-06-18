import * as Yup from 'yup';
import { Op } from 'sequelize';
import Category from '../models/Category';
import File from '../models/File';

class CategoryController {
  async index(req, res) {
    const { q } = req.query;
    const name = q || '';

    const categories = await Category.findAndCountAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
      attributes: ['id', 'name'],
      include: [
        {
          model: File,
          as: 'logo',
          attributes: ['name', 'path', 'url'],
        },
      ],
      order: [['name', 'ASC']],
    });
    return res.json(categories);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro nos dados, por favor confira todos os campos' });
    }

    const result = await Category.create(req.body);

    return res.json(result);
  }
}

export default new CategoryController();
