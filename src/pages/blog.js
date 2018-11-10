import React from 'react';
import styled from 'styled-components';

import ArticleCard from '../components/article-card';
import Layout from '../components/layout';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Blog = () => (
  <Layout>
    <Wrapper>
      <ArticleCard />
    </Wrapper>
  </Layout>
);

export default Blog;
