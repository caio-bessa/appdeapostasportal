module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS', ['key1', 'key2', 'key3', 'key4']),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  settings: {
    cors: {
      enabled: true,
      headers: '*',
      origin: [
        'http://localhost:3000',
        'https://appdeapostas.com.br',
        env('FRONTEND_URL', 'http://localhost:3000')
      ]
    },
  },
});