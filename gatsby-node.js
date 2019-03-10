const { createFilePath } = require('gatsby-source-filesystem');

const path = require('path');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve) => {
    graphql(`
      {
        articles: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/articles/" } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                serie
              }
            }
          }
        }
        series: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/series/" } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                description
                thumbnail
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.articles.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve('./src/components/blog-layout.js'),
          context: {
            slug: node.fields.slug,
            serie: node.frontmatter.serie,
          },
        });
      });
      result.data.series.edges.forEach(({ node }) => {
        createPage({
          path: '/serie' + node.fields.slug,
          component: path.resolve('./src/components/serie-layout.js'),
          context: {
            slug: node.fields.slug,
            title: node.frontmatter.title,
            description: node.frontmatter.description,
            thumbnail: node.frontmatter.thumbnail,
          },
        });
      });
      resolve();
    });
  });
};
