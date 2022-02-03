const path = require('path')

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  i18n: {
    locales: ['en-US', 'fr', 'pt-BR'],
    defaultLocale: 'pt-BR',
    domains: [
      {
        domain: 'example.com',
        defaultLocale: 'en-US',
      },
      {
        domain: 'example.fr',
        defaultLocale: 'fr',
      },
      {
        domain: 'example.br',
        defaultLocale: 'pt-BR'
      },
    ],
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'css')],
  },
}

