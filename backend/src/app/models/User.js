import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        admin: Sequelize.BOOLEAN,
        active: Sequelize.BOOLEAN,
        activeCode: Sequelize.STRING,
        recoveryCode: Sequelize.STRING,
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        registration: Sequelize.INTEGER,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    this.addHook('beforeCreate', async (user) => {
      user.activeCode = crypto.randomBytes(8).toString('hex');
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
