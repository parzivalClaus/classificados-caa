import File from '../models/File';

class FileController {
  async store(req, res) {
    const { filename: path, originalname: name } = req.file;

    try {
      const file = await File.create({
        name,
        path,
      });

      return res.json(file);
    } catch (err) {
      return res.json(err);
    }
  }
}

export default new FileController();
