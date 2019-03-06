import React from 'react';

import Layout from '../components/layout';

import DreamyGarden from '../components/dreamy-garden';
import SEO from '../components/seo';

const DreamyGardenPage = () => (
  <Layout>
    <SEO title='Dreamy Garden' />
    <DreamyGarden />
  </Layout>
);

export default DreamyGardenPage;
