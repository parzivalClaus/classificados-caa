import Sequelize, { Model } from 'sequelize';

class Company extends Model {
  static init(sequelize) {
    super.init(
      {
        active: Sequelize.BOOLEAN,
        category: Sequelize.STRING,
        name: Sequelize.STRING,
        phone: Sequelize.STRING,
        whatsapp: Sequelize.STRING,
        email: Sequelize.STRING,
        website: Sequelize.STRING,
        instagram: Sequelize.STRING,
        facebook: Sequelize.STRING,
        number: Sequelize.STRING,
        street: Sequelize.STRING,
        district: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        zipcode: Sequelize.STRING,
        description: Sequelize.STRING,
        discount: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'logo_id', as: 'logo' });
    this.belongsTo(models.User, { foreignKey: 'creator_id', as: 'creator' });
  }
}

export default Company;
