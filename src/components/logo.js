import React from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-self: center flex-start;
  font-weight: 400;
`;

const shouldShow = props => {
  if (props.scrolled) {
    if (props.showOnScroll) return true;
    if (props.hideOnScroll) return false;
  }
  if (props.showOnScroll) return false;
  return true;
};

const Handle = styled.span`
  transition: opacity 250ms ease-out, margin 250ms ease-in-out;
  ${props => {
    if (shouldShow(props)) {
      return css`
        opacity: 1;
      `;
    }
    return css`
      opacity: 0;
      margin-right: ${props.marginOnHide || '-.5em'};
    `;
  }};
`;

const Logo = ({ isScrolled }) => (
  <Wrapper>
    <Handle scrolled={isScrolled} showOnScroll>
      [
    </Handle>
    q
    <Handle scrolled={isScrolled} hideOnScroll marginOnHide="-1.2em">
      uo
    </Handle>
    c
    <Handle scrolled={isScrolled} hideOnScroll marginOnHide="-0.6em">
      &nbsp;
    </Handle>
    kh
    <Handle
      scrolled={isScrolled}
      hideOnScroll
      marginOnHide="-.6em"
    >
      a
    </Handle>
    nh
    <Handle scrolled={isScrolled} default={0} showOnScroll>
      ]
    </Handle>
  </Wrapper>
);

export default Logo;
