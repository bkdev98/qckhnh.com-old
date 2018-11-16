import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import ArticleCard from '../components/article-card';
import Layout from '../components/layout';

const Wrapper = styled.div`
  :after {
    clear: both;
    content: "";
    display: table;
  }
`;

const Column = styled.div`
  display: inline-block;
  position: absolute;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  vertical-align: top;
  top: 0;
  :after {
    clear: both;
    content: "";
    display: table;
  }
`;

const ColumnLeft = styled(Column)`
  display: block;
  width: calc(50% - 150px);
  margin-top: calc(80px + 85px);
  left: 0%;
  .entries {
    right: initial;
    left: 50%;
    transform: translate(-45%, 0%);
    position: absolute;
  }
`;

const ColumnCenter = styled(Column)`
  display: block;
  width: 300px;
  left: calc(50% - 150px);
  margin-top: calc(80px + 250px);
  margin-left: 0;
  margin-right: 0;
  .entries {
    left: 50%;
    transform: translate(-50%, 0%);
    position: absolute;
  }
`;

const ColumnRight = styled(Column)`
  display: block;
  width: calc(50% - 150px);
  margin-top: calc(80px + 165px);
  right: 0;
  .entries {
    display: block;
    position: absolute;
    width: 300px;
    left: 50%;
    transform: translate(-55%, 0%);
  }
`;

const Blog = ({ data: { articles } }) => (
  <Layout>
    <Wrapper>
      <ColumnLeft>
        <div className='entries'>
          {articles.edges.map(({ node }, idx) => (idx === 0 || idx % 3 === 0) && (
            <ArticleCard key={node.id} data={node} />
          ))}
        </div>
      </ColumnLeft>
      <ColumnCenter>
        <div className='entries'>
          {articles.edges.map(({ node }, idx) => (idx === 1 || (idx - 1) % 3 === 0) && (
            <ArticleCard key={node.id} data={node} />
          ))}
        </div>
      </ColumnCenter>
      <ColumnRight>
        <div className='entries'>
          {articles.edges.map(({ node }, idx) => (idx === 2 || (idx - 2) % 3 === 0) && (
            <ArticleCard key={node.id} data={node} />
          ))}
        </div>
      </ColumnRight>
      <div style={{ clear: 'both' }} />
    </Wrapper>
  </Layout>
);

export default Blog;

export const pageQuery = graphql`
  query IndexQuery {
    articles: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/articles/" } }
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
            date
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
