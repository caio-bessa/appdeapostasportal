const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
  // Configuração para desenvolvimento local
  if (env('NODE_ENV') === 'development') {
    return {
      connection: {
        client: 'postgres',
        connection: {
          host: env('DATABASE_HOST', 'localhost'),
          port: env.int('DATABASE_PORT', 5432),
          database: env('DATABASE_NAME', 'appdeapostas'),
          user: env('DATABASE_USERNAME', 'postgres'),
          password: env('DATABASE_PASSWORD', 'appdeapostas123'),
          ssl: env.bool('DATABASE_SSL', false),
        },
      },
    };
  }

  // Configuração para produção
  if (env('DATABASE_URL')) {
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

  // Fallback para configuração manual
  return {
    connection: {
      client: 'postgres',
      connection: {
        host: env('DATABASE_HOST', 'postgres'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'appdeapostas'),
        user: env('DATABASE_USERNAME', 'postgres'),
        password: env('DATABASE_PASSWORD'),
        ssl: env.bool('DATABASE_SSL', false),
      },
    },
  };
};