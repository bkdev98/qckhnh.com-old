import React from 'react';
import { graphql } from 'gatsby';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';

import ArticleCard from '../components/article-card';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Wrapper = styled.div`
  max-width: 1250px;
  margin: 0 auto;
  margin-top: 150px;
`;

const getMarginTop = idx => {
  if (idx === 1 || (idx - 1) % 3 === 0) {
    return '100px';
  } else if (idx === 2 || (idx - 2) % 3 === 0) {
    return '50px';
  }
  return 0;
};

const Series = ({ data: { articles }, pageContext }) => (
  <Layout>
    <SEO
      title={pageContext.title}
      thumbnail={pageContext.thumbnail}
      description={pageContext.description}
    />
    <Wrapper>
      <Grid fluid>
        <h3 style={{ textAlign: 'center', backgroundColor: '#3C3C3E', color: '#FB7EBB', padding: '15px 0' }}>
          {pageContext.title}
        </h3>
        <Row style={{ marginTop: 80 }}>
          {articles.edges.map(({ node }, idx) => (
            <Col lg={4} md={6} sm={12} key={node.id} style={{ marginTop: getMarginTop(idx) }}>
              <ArticleCard data={node} />
            </Col>
          ))}
        </Row>
      </Grid>
    </Wrapper>
  </Layout>
);

export default Series;

export const pageQuery = graphql`
  query SeriesQuery($title: String!) {
    articles: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/articles/" }, frontmatter: { serie: { eq: $title } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            description
            tag
            thumbnail
            date(formatString: "DD-MM-YYYY")
          }
          html
          fields {
            slug
          }
        }
      }
    }
  }
`;
