module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'classificadoscaa',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
