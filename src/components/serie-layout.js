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

const Meta = styled.div`
  max-width: 550px;
  margin: 0 auto;
`;

const Title = styled.h3`
  color: #3C3C3E;
  text-align: center;
`;

const Description = styled.p`
  color: #FB7EBB;
  text-align: center;
  font-size: 16px;
`;

const getMarginTop = idx => {
  if (idx === 1 || (idx - 1) % 3 === 0) {
    return '100px';
  } else if (idx === 2 || (idx - 2) % 3 === 0) {
    return '50px';
  }
  return 0;
};

const Series = ({ data: { tutorials }, pageContext }) => (
  <Layout>
    <SEO
      title={pageContext.title}
      thumbnail={pageContext.thumbnail}
      description={pageContext.description}
    />
    <Wrapper>
      <Grid fluid>
        <Meta>
          <Title>
            {pageContext.title}
          </Title>
          <Description>{pageContext.description}</Description>
        </Meta>
        <Row style={{ marginTop: 80 }}>
          {tutorials.edges.map(({ node }, idx) => (
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
    tutorials: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/tutorials/" }, frontmatter: { serie: { eq: $title } } }
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
