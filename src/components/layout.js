import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import './layout.css';
import Header from './header';
import Footer from './footer';
import Email from './email';
import Social from './social';
import SEO from './seo';

const Wrapper = styled.div`
  overflow: hidden;
  ::after {
    content: "";
    display: table;
    clear: both;
  }
`;

const Layout = ({ children }) => (
  <>
    <SEO />
    <Header />
    <Wrapper>
      {children}
    </Wrapper>
    <Email />
    <Social />
    <Footer />
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
