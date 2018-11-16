import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import './layout.css';
import thumbnail from '../images/thumbnail.png';
import Header from './header';
import Footer from './footer';
import Email from './email';
import Social from './social';

const Wrapper = styled.div`
  overflow: hidden;
  ::after {
    content: "";
    display: table;
    clear: both;
  }
`;

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Welcome to my portfolio!' },
            { name: 'image', content: thumbnail },
            { name: 'keywords', content: 'qckhnh' },
            { name: 'og:title', content: 'qckhnh.com | Quoc Khanh' },
            { name: 'og:url', content: 'https://qckhnh.com' },
            { name: 'og:type', content: 'website' },
            { name: 'og:description', content: 'Welcome to my portfolio!' },
            { name: 'og:image', content: thumbnail },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header />
        <Wrapper>
          {children}
        </Wrapper>
        <Email />
        <Social />
        <Footer />
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
