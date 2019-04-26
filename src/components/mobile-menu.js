import React, { Component } from 'react';
import { Link } from 'gatsby';
import { Spring } from 'react-spring';
import { FiSun, FiMoon } from 'react-icons/fi';

import styled from 'styled-components';
import { media } from '../utils/media';

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  z-index: 1;
  height: 100vh;
  outline: 0;
  display: ${props => (props.menuOpen ? 'block' : 'none')};
`;

const Sidebar = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  background-color: ${props => props.isDark ? '#3c3c3e' : '#FFF'};
  padding: 50px;
  width: 50vw;
  height: 100%;
  position: relative;
  right: 0;
  margin-left: auto;
  ${media.thone`padding: 25px;`};
  ${media.phablet`width: 75vw;`};
  ${media.tiny`padding: 10px;`};
`;

const NavLinks = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  text-align: center;
  a {
    color: ${props => props.isDark ? '#FFF' : '#3C3C3E'};
  }
`;

const NavListItem = styled.li`
  margin: 10px 20px;
  position: relative;
  font-size: 14px;
  list-style: none;
  counter-increment: item 1;
  &:before {
    content: '0' counter(item) '.';
    color: #FB7EBB;
    font-size: 14px;
    margin-bottom: 5px;
  }
`;

const NavLink = styled(Link)`
  padding: 3px 20px 20px;
  width: 100%;
  text-decoration: none;
`;
const SettingWrapper = styled(NavListItem)`
  margin: 0px auto 20px;
  &:before {
    display: none;
  }
`;
const Setting = styled.button`
  outline: none;
  border: none;
  span {
    margin-left: 20px;
  }
  cursor: pointer;
  background-color: transparent;
  font-size: 24px;
  padding: 0px;
  color: ${props => props.isDark ? '#FB7EBB' : '#3C3C3E'};
  :hover {
    color: #FB7EBB;
  }
`;

class Menu extends Component {
  state = {
    toggleCount: 0,
  }

  handleChangeTheme = theme => {
    this.props.changeSetting('theme', theme);
    if (this.state.toggleCount < 9) {
      this.setState(state => ({ toggleCount: state.toggleCount + 1 }))
    } else {
      this.props.toggleSetting();
      this.setState({ toggleCount: 0 })
    }
  }

  render() {
    const { menuOpen, handleMenuClick, settings } = this.props;

    return (
      <MenuContainer
        menuOpen={menuOpen}
        onClick={handleMenuClick}
      >
        <Sidebar isDark={settings.theme === 'dark'}>
          <NavLinks isDark={settings.theme === 'dark'}>
            <Spring from={{ marginBottom: 10, opacity: 0 }} to={{ marginBottom: 0, opacity: 1 }} delay={300}>
              {styles => (
                <NavListItem style={styles}>
                  <NavLink to='/'>About</NavLink>
                </NavListItem>
              )}
            </Spring>
            <Spring from={{ marginBottom: 10, opacity: 0 }} to={{ marginBottom: 0, opacity: 1 }} delay={400}>
              {styles => (
                <NavListItem style={styles}>
                  <NavLink to='/tutorials'>Tutorials</NavLink>
                </NavListItem>
              )}
            </Spring>
            <Spring from={{ marginBottom: 10, opacity: 0 }} to={{ marginBottom: 0, opacity: 1 }} delay={500}>
              {styles => (
                <NavListItem style={styles}>
                  <NavLink to='/blog'>Blog</NavLink>
                </NavListItem>
              )}
            </Spring>
            <Spring from={{ marginBottom: 10, opacity: 0 }} to={{ marginBottom: 0, opacity: 1 }} delay={600}>
              {styles => (
                <NavListItem style={styles}>
                  <NavLink to='/projects'>Projects</NavLink>
                </NavListItem>
              )}
            </Spring>
            <Spring from={{ marginBottom: 10, opacity: 0 }} to={{ marginBottom: 0, opacity: 1 }} delay={700}>
              {styles => (
                <NavListItem style={styles}>
                  <NavLink to='contact'>Contact</NavLink>
                </NavListItem>
              )}
            </Spring>
            {/* {settings.theme && <Spring from={{ marginBottom: 10, opacity: 0 }} to={{ marginBottom: 0, opacity: 1 }} delay={800}>
              {styles => (
                <SettingWrapper style={styles}>
                  <Setting isDark={settings.theme === 'dark'} onClick={toggleSetting}>
                    <FiSettings style={{ color: '#FB7EBB', marginTop: 4 }} /> <span>Settings</span>
                  </Setting>
                </SettingWrapper>
              )}
            </Spring>} */}
          </NavLinks>
        </Sidebar>
      </MenuContainer>
    );
  }
}

export default Menu;
