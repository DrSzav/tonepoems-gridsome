// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const DotenvWebpack = require('dotenv-webpack');

module.exports = {
  chainWebpack: (config) => {
      config
      .plugin('env')
      .use(require.resolve('webpack/lib/EnvironmentPlugin'), 
      ['FIREBASE_API_KEY', 'FIREBASE_AUTH_DOMAIN', 'FIREBASE_DATABASE_URL', 'FIREBASE_PROJECT_ID', 'FIREBASE_STORAGE_BUCKET', 'FIREBASE_MESSAGING_SENDER_ID', 'FIREBASE_APP_ID'])
    },

  siteName: 'Tone Poems',
  plugins: [
    {
      use: 'gridsome-plugin-tailwindcss',
    },
  ],
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        // ...global plugins
      ]
    }
  }
}
