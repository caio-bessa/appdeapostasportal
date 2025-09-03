const path = require('path');

module.exports = ({ env }) => {
  // Para desenvolvimento - usar SQLite (funciona sem Docker)
  if (env('NODE_ENV', 'development') === 'development') {
    return {
      connection: {
        client: 'sqlite',
        connection: {
          filename: path.join(__dirname, '..', '.tmp/data.db'),
        },
        useNullAsDefault: true,
      },
    };
  }

  // Para produção - PostgreSQL (quando disponível)
  if (env('DATABASE_URL')) {
    const parse = require('pg-connection-string').parse;
    const config = parse(env('DATABASE_URL'));
    return {
      connection: {
        client: 'postgres',
        connection: {
          host: config.host,
          port: config.port,
          database: config.database,
          user: config.user,
          password: config.password,
          ssl: env.bool('DATABASE_SSL', false),
        },
      },
    };
  }

  // Fallback para SQLite se PostgreSQL não disponível
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', '.tmp/data.db'),
      },
      useNullAsDefault: true,
    },
  };
};