import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';
import Company from '../app/models/Company';
import Category from '../app/models/Category';

import databaseConfig from '../config/database';

const models = [User, File, Company, Category];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) =>
          model && model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
