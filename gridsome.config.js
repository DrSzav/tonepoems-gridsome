// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  chainWebpack (config) {
    config.mode('development')
  },

  siteName: 'Tone Poems',
  plugins: [
    {
      use: 'gridsome-plugin-tailwindcss'
    },
  /* {
     use: `gridsome-plugin-netlify-cms`,
     options: {
       publicPath: `/admin`
     }
   },*/
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
  },
  configureWebpack: {
    // merged with the internal config
    module: {
      rules: [
        {
          test: /\.(gql|graphql)$/,
          loader: 'graphql-tag/loader'
        }
      ]
    }
  }

}
