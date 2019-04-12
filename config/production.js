const localPg = {
  host: 'localhost',
  database: 'toilet',
  user: 'Fecalfeliac',
  password: 'plop'
};

const productionDbConnection = process.env.DATABASE_URL || localPg;

module.exports = {
  knex: {
    client: 'pg',
    connection: productionDbConnection,
  }
};
