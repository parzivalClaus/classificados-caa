const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          admin: true,
          active: true,
          name: 'Administrador',
          email: 'admin@classificadoscaa.com.br',
          password_hash: bcrypt.hashSync('123456', 8),
          registration: 99999999,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
