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
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-transformer-remark',
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
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/utils/cms.js`,
        htmlTitle: 'qckhnh.com CMS',
      },
    },
  ],
};
