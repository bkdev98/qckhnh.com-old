import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { media } from '../utils/media';
import FlickerText from './flicker-text';

const FLICKER_TEXT = [
  { first: 'Software', last: 'Artisan' },
  { first: 'Dog', last: 'Lover' },
  { first: 'Night', last: 'Owl' },
  { first: 'Experience', last: 'Engineer' },
];

const Text = styled.div`
  display: table;
  font-size: 13px;
  font-weight: 300;
  text-align: left;
  letter-spacing: 5px;
  line-height: 20px;
  padding: 0px 5px 0px 10px;
  margin-bottom: 1px;
  background-color: #3C3C3E;
  color: white;
  ${media.tablet`
    font-size: 12px;
  `};
  ${media.tablet`
    font-size: 12px;
    line-height: 16px;
    display: inline-block;
    text-align: center;
    letter-spacing: 2px;
  `};
`;

class HeroFlicker extends Component {
  state = {
    idx: 0,
    first: FLICKER_TEXT[0].first,
    last: FLICKER_TEXT[0].last,
  }

  componentDidMount() {
    this.timer = setInterval(this.changeText, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  changeText = () => {
    const nextIdx = this.state.idx === FLICKER_TEXT.length - 1 ? 0 : this.state.idx + 1;
    this.setState({
      first: FLICKER_TEXT[nextIdx].first,
      last: FLICKER_TEXT[nextIdx].last,
      idx: nextIdx,
    });
  }

  render() {
    return (
      <Fragment>
        <Text>
          <FlickerText max={15} delay={70}>{this.state.first}</FlickerText>
        </Text>
        <Text>
          <FlickerText max={15} delay={70}>{this.state.last}</FlickerText>
        </Text>
      </Fragment>
    );
  }
}

export default HeroFlicker;
