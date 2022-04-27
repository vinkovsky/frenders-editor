module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('URL', 'https://api-frenders.herokuapp.com'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '22c088cb6220e59e414b0e50d1afebaa'),
    },
  },
});
