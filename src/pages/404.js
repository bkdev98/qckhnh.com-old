import React from 'react';
import styled from 'styled-components';

import Section from '../components/section';
import Layout from '../components/layout';

const Wrapper = styled(Section)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  letter-spacing: 4px;
`;

const NotFound = () => (
  <Layout>
    <Wrapper>
    Not found...
    </Wrapper>
  </Layout>
);

export default NotFound;
