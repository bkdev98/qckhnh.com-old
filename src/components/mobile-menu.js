import React, { Component } from 'react';
import { Link } from 'gatsby';
import { Spring } from 'react-spring';

import styled from 'styled-components';
import { media } from '../utils/media';

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  outline: 0;
  visibility: ${props => (props.menuOpen ? 'visible' : 'hidden')};
  display: block;
`;

const Sidebar = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  background-color: white;
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
`;

const NavListItem = styled.li`
  margin: 10px 20px;
  position: relative;
  font-size: 14px;
  color: white;
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
  color: #3C3C3E;
`;

class Menu extends Component {
  render() {
    const { menuOpen, handleMenuClick } = this.props;

    return (
      <MenuContainer
        menuOpen={menuOpen}
        onClick={handleMenuClick}
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? 1 : -1}
      >
        <Sidebar>
          <NavLinks>
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
                  <NavLink to='/blog'>Articles</NavLink>
                </NavListItem>
              )}
            </Spring>
            <Spring from={{ marginBottom: 10, opacity: 0 }} to={{ marginBottom: 0, opacity: 1 }} delay={500}>
              {styles => (
                <NavListItem style={styles}>
                  <NavLink to='/projects'>Projects</NavLink>
                </NavListItem>
              )}
            </Spring>
            <Spring from={{ marginBottom: 10, opacity: 0 }} to={{ marginBottom: 0, opacity: 1 }} delay={600}>
              {styles => (
                <NavListItem style={styles}>
                  <NavLink to='contact'>Contact</NavLink>
                </NavListItem>
              )}
            </Spring>
          </NavLinks>
        </Sidebar>
      </MenuContainer>
    );
  }
}

export default Menu;
