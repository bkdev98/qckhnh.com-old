import React, { Component } from 'react';
import styled from 'styled-components';
import { Spring } from 'react-spring';
import { Link } from 'gatsby';
import { FiMoon, FiSun } from 'react-icons/fi';

import { throttle } from '../utils/math';
import { media } from '../utils/media';
import MobileMenu from './mobile-menu';
import Logo from './logo';

const HEADER_HEIGHT = 100;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0px;
  background-color: ${props => props.isDark ? '#000' : '#FFF'};
  /* overflow: hidden; */
  width: 100%;
  z-index: 99;
  height: ${props =>
    (props.scrollDirection === 'none' ? '100px' : '70px')};
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  padding: 0px 50px;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
  ${media.desktop`padding: 0 40px;`};
  ${media.tablet`padding: 0 25px;`};
  ::after {
    content: "";
    display: table;
    clear: both;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  counter-reset: item 0;
  position: relative;
  z-index: 2;
`;

const Hamburger = styled.div`
  justify-content: center;
  align-items: center;
  overflow: visible;
  margin: 0 -12px 0 0;
  padding: 15px 5px 15px 15px;
  cursor: pointer;
  transition-timing-function: linear;
  transition-duration: 0.15s;
  transition-property: opacity, filter;
  text-transform: none;
  color: inherit;
  border: 0;
  background-color: ${props => props.isDark ? '#3c3c3e' : '#FFF'};
  display: none;
  ${media.tablet`display: flex;`};
`;

const HamburgerBox = styled.div`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 24px;
`;

const HamburgerInner = styled.div`
  background-color: #FB7EBB;
  position: absolute;
  width: 30px;
  height: 2px;
  border-radius: 2px;
  top: 50%;
  left: 0;
  right: 0;
  transition-duration: 0.22s;
  transition-property: transform;
  transition-delay: ${props => (props.menuOpen ? '0.12s' : '0s')};
  transform: rotate(${props => (props.menuOpen ? '225deg' : '0deg')});
  transition-timing-function: cubic-bezier(
    ${props => (props.menuOpen ? '0.215, 0.61, 0.355, 1' : '0.55, 0.055, 0.675, 0.19')}
  );
  &:before,
  &:after {
    content: '';
    display: block;
    background-color: #FB7EBB;
    position: absolute;
    left: auto;
    right: 0;
    width: 30px;
    height: 2px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
    border-radius: 4px;
  }
  &:before {
    width: ${props => (props.menuOpen ? '100%' : '120%')};
    top: ${props => (props.menuOpen ? '0' : '-10px')};
    opacity: ${props => (props.menuOpen ? 0 : 1)};
    transition: ${props => (props.menuOpen
    ? 'top 0.1s ease-out, opacity 0.1s ease-out 0.12s'
    : 'top 0.1s ease-in 0.25s, opacity 0.1s ease-in')};
  }
  &:after {
    width: ${props => (props.menuOpen ? '100%' : '80%')};
    bottom: ${props => (props.menuOpen ? '0' : '-10px')};
    transform: rotate(${props => (props.menuOpen ? '-90deg' : '0')});
    transition: ${props => (props.menuOpen
    ? 'bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s'
    : 'bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)')};
  }
  ${media.thone`
    width: 20px;
    &:before {
      top: ${props => (props.menuOpen ? '0' : '-8px')};
    }
    &:after {
      bottom: ${props => (props.menuOpen ? '0' : '-8px')};
    }
  `};
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  ${media.tablet`display: none;`};
`;

const NavList = styled.ol`
  padding: 0px;
  margin: 0px;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.isDark ? '#FFF' : '#3C3C3E'};
`;

const Setting = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  background-color: transparent;
  font-size: 18px;
  padding: 0px;
  color: #FB7EBB;
  margin-top: 3px;
`;

const SettingWrapper = styled.div`
  display: none;
  margin-right: 15px;
  ${media.tablet`display: block;`};
  ${Setting} {
    font-size: 24px;
    margin-top: 0px;
    padding: 10px;
    svg {
      margin-top: 5px;
    }
  }
`;

const NavListItem = styled.li`
  position: relative;
  font-size: 12px;
  margin: 0px 10px;
  letter-spacing: 2px;
  font-weight: 300;
  counter-increment: item 1;
  :hover {
    color: #FB7EBB;
  }
  ::before {
    content: "0" counter(item) ".";
    text-align: right;
    color: #FB7EBB;
    letter-spacing: 2px;
    font-size: 12px;
  }
`;

const NavListItemLink = styled(Link)`
  display: inline-block;
  text-decoration-skip-ink: auto;
  color: inherit;
  position: relative;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
  padding: 10px 10px;
`;

const LogoWrapper = styled(Link)`
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FB7EBB;
  text-decoration: none;
`;

const DELTA = 5;

class Header extends Component {
  state = {
    lastScrollTop: 0,
    scrollDirection: 'none',
    menuOpen: false,
    toggleCount: 0,
  }

  componentDidMount() {
    window.addEventListener('scroll', () => throttle(this.handleScroll()));
    window.addEventListener('resize', () => throttle(this.handleResize()));
    window.addEventListener('keydown', () => this.handleKeydown());
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => this.handleScroll());
    window.removeEventListener('resize', () => this.handleResize());
    window.removeEventListener('keydown', () => this.handleKeydown());
  }

  handleScroll = () => {
    const { lastScrollTop, menuOpen, scrollDirection } = this.state;
    const fromTop = window.scrollY;

    // Make sure they scroll more than DELTA
    if (Math.abs(lastScrollTop - fromTop) <= DELTA || menuOpen) {
      return;
    }

    if (fromTop < DELTA) {
      this.setState({ scrollDirection: 'none' });
    } else if (fromTop > lastScrollTop && fromTop > HEADER_HEIGHT) {
      if (scrollDirection !== 'down') {
        this.setState({ scrollDirection: 'down' });
      }
    } else if (fromTop + window.innerHeight < document.body.scrollHeight) {
      if (scrollDirection !== 'up') {
        this.setState({ scrollDirection: 'up' });
      }
    }

    this.setState({ lastScrollTop: fromTop });
  }

  handleResize = () => {
    const { menuOpen } = this.state;

    if (window.innerWidth > 840 && menuOpen) {
      this.toggleMenu();
    }
  }

  handleKeydown = evt => {
    const { menuOpen } = this.state;

    if (!menuOpen || !evt) {
      return;
    }

    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.toggleMenu();
    }
  }

  toggleMenu = () => this.setState(state => ({ menuOpen: !state.menuOpen }));

  handleMenuClick = e => {
    const target = e.target;
    const isLink = target.hasAttribute('href');
    const isContainer = target.classList && target.classList[0] && target.classList[0].includes('MenuContainer');

    if (isLink || isContainer) {
      this.toggleMenu();
    }
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
    const { scrollDirection, menuOpen } = this.state;
    const { toggleSetting, settings, changeSetting } = this.props;

    return (
      <Wrapper scrollDirection={scrollDirection} isDark={settings.theme === 'dark'}>
        <Nav>
          <Spring from={{ marginBottom: 10, opacity: 0 }} to={{ marginBottom: 0, opacity: 1 }}>
            {styles => (
              <LogoWrapper to='/' style={styles}>
                <Logo isScrolled={scrollDirection !== 'none'} />
              </LogoWrapper>
            )}
          </Spring>
          <div style={{ display: "flex", alignItems: 'center' }}>
            <SettingWrapper>
              {settings.theme && <Spring from={{ marginBottom: 10, opacity: 0 }} to={{ marginBottom: 0, opacity: 1 }} delay={100}>
                {styles => settings.theme === 'dark'
                  ? (
                    <Setting isDark={settings.theme === 'dark'} style={styles} onClick={() => this.handleChangeTheme('light')}>
                      <FiMoon />
                    </Setting>
                  ) : (
                    <Setting isDark={settings.theme === 'dark'} style={styles} onClick={() => this.handleChangeTheme('dark')}>
                      <FiSun />
                    </Setting>
                  )
                }
              </Spring>}
            </SettingWrapper>

            <Hamburger isDark={settings.theme === 'dark'} onClick={this.toggleMenu}>
              <HamburgerBox>
                <HamburgerInner menuOpen={menuOpen} />
              </HamburgerBox>
            </Hamburger>
          </div>
          <NavLinks>
            <NavList isDark={settings.theme === 'dark'}>
              <Spring from={{ marginBottom: 10, opacity: 0 }} to={{ marginBottom: 0, opacity: 1 }} delay={300}>
                {styles => (
                  <NavListItem style={styles}>
                    <NavListItemLink to='/'>About</NavListItemLink>
                  </NavListItem>
                )}
              </Spring>
              <Spring from={{ marginBottom: 10, opacity: 0 }} to={{ marginBottom: 0, opacity: 1 }} delay={400}>
                {styles => (
                  <NavListItem style={styles}>
                    <NavListItemLink to='/tutorials'>Tutorials</NavListItemLink>
                  </NavListItem>
                )}
              </Spring>
              <Spring from={{ marginBottom: 10, opacity: 0 }} to={{ marginBottom: 0, opacity: 1 }} delay={500}>
                {styles => (
                  <NavListItem style={styles}>
                    <NavListItemLink to='/blog'>Blog</NavListItemLink>
                  </NavListItem>
                )}
              </Spring>
              <Spring from={{ marginBottom: 10, opacity: 0 }} to={{ marginBottom: 0, opacity: 1 }} delay={600}>
                {styles => (
                  <NavListItem style={styles}>
                    <NavListItemLink to='/projects'>Projects</NavListItemLink>
                  </NavListItem>
                )}
              </Spring>
              <Spring from={{ marginBottom: 10, opacity: 0 }} to={{ marginBottom: 0, opacity: 1 }} delay={700}>
                {styles => (
                  <NavListItem style={styles}>
                    <NavListItemLink to='/contact'>Contact</NavListItemLink>
                  </NavListItem>
                )}
              </Spring>
              {/* {settings.theme && <Spring from={{ marginBottom: 10, opacity: 0 }} to={{ marginBottom: 0, opacity: 1 }} delay={800}>
                {styles => (
                  <Setting isDark={settings.theme === 'dark'} style={styles} onClick={toggleSetting}>
                    <FiSettings />
                  </Setting>
                )}
              </Spring>} */}
              {settings.theme && <Spring from={{ marginBottom: 10, opacity: 0 }} to={{ marginBottom: 0, opacity: 1 }} delay={800}>
                {styles => settings.theme === 'dark'
                  ? (
                    <Setting isDark={settings.theme === 'dark'} style={styles} onClick={() => this.handleChangeTheme('light')}>
                      <FiMoon />
                    </Setting>
                  ) : (
                    <Setting isDark={settings.theme === 'dark'} style={styles} onClick={() => this.handleChangeTheme('dark')}>
                      <FiSun />
                    </Setting>
                  )
                }
              </Spring>}
            </NavList>
          </NavLinks>
        </Nav>

        <MobileMenu
          menuOpen={menuOpen}
          settings={settings}
          changeSetting={changeSetting}
          toggleSetting={toggleSetting}
          handleMenuClick={e => this.handleMenuClick(e)}
        />
      </Wrapper>
    );
  }
}

export default Header;
