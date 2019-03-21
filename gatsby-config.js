module.exports = {
  siteMetadata: {
    title: 'qckhnh.com',
    description: 'Hi, my name is Quoc Khanh. I build software and blogging.',
    author: '@qckhnh',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/static/assets`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: 'https://inntoeq.us18.list-manage.com/subscribe/post?u=762f95dacfbb43b343d4ce507&amp;id=997e1d2ba3',
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-embed-autoplay-video",
            options: {
              width: '100%',
              height: '400',
              related: false,
              noIframeBorder: true,
            }
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '÷',
            },
          },
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'qckhnh.com',
        short_name: 'qckhnh',
        start_url: '/',
        background_color: '#FB7EBB',
        theme_color: '#FB7EBB',
        display: 'minimal-ui',
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-121546163-2',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/articles`,
        name: 'articles',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/series`,
        name: 'series',
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/utils/cms.js`,
        htmlTitle: 'qckhnh.com CMS',
      },
    },
    {
      resolve: 'gatsby-plugin-drift',
      options: {
        appId: '5hwf7nw43gmr',
      },
    },
    {
      resolve: 'gatsby-plugin-facebook-pixel',
      options: {
        pixelId: '395297037956822',
      },
    },
  ],
};
