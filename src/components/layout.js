import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import './layout.css';

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
            { name: 'image', content: 'https://qckhnh.com/images/thumbnail.png' },
            { name: 'keywords', content: 'qckhnh' },
            { name: 'og:title', content: 'qckhnh.com | Quoc Khanh' },
            { name: 'og:url', content: 'https://qckhnh.com' },
            { name: 'og:type', content: 'website' },
            { name: 'og:description', content: 'Welcome to my portfolio!' },
            { name: 'og:image', content: 'https://qckhnh.com/images/thumbnail.png' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <div>
          {children}
        </div>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
