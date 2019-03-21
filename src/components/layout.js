import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import './layout.css';
import Header from './header';
import Footer from './footer';
import Email from './email';
import Social from './social';
import SEO from './seo';
import SettingModal from './setting-modal';

const Wrapper = styled.div`
  overflow: hidden;
  color: ${props => props.settings.theme === 'dark' ? '#FFF' : '#3c3c3e'};
  background-color: ${props => props.settings.theme === 'dark' ? '#3c3c3e' : '#FFF'};
  z-index: -1;
  ::after {
    content: "";
    display: table;
    clear: both;
  }
`;

class Layout extends Component {
  state = {
    showSetting: false,
  }

  toggleSetting = () => this.setState(state => ({ showSetting: !state.showSetting }));

  render() {
    const { showSetting } = this.state;
    const { children, settings = {}, changeSetting, resetSetting } = this.props;

    return (
      <>
        <SEO title='Home' />
        <Header toggleSetting={this.toggleSetting} settings={settings} changeSetting={changeSetting} />
        <Wrapper settings={settings}>
          {children}
        </Wrapper>
        {settings &&
          <SettingModal
            open={showSetting}
            onClose={this.toggleSetting}
            settings={settings}
            changeSetting={changeSetting}
            resetSetting={resetSetting}
          />}
        <Email settings={settings} />
        <Social settings={settings} />
        <Footer settings={settings} />
      </>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
