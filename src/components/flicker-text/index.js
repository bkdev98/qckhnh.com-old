import React from 'react';
import PropTypes from 'prop-types';
import Flicker, { defaultCharacters } from './flicker';
import {
  extractTextFromElement,
  eachPromise,
  cloneElementWithSpecifiedText,
} from '../../utils/char';

class FlickerText extends React.Component {
  static propTypes = {
    tagName: PropTypes.string.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    delay: PropTypes.number,
    characters: PropTypes.string,
  };

  static defaultProps = {
    tagName: 'div',
    min: 1,
    max: 10,
    delay: 100,
    characters: defaultCharacters,
  };

  constructor(props) {
    super(props);
    const { min, max, delay, characters } = props;
    this.flicker = new Flicker(min, max, delay, characters);
    this.mounted = false;
    this.linesToType = [];

    if (props.children) {
      this.linesToType = extractTextFromElement(props.children);
    }

    this.state = {
      textLines: [],
    };
  }

  componentDidMount() {
    this.mounted = true;
    const { children } = this.props;
    if (children) {
      this.typeAllLines();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { children } = this.props;
    if (nextProps.children !== children) {
      this.linesToType = extractTextFromElement(nextProps.children);
      this.mounted = true;
      this.typeAllLines();
    }
  }

  typeAllLines = (lines = this.linesToType) =>
    eachPromise(lines, this.typeLine);

  typeLine = (line, lineIdx) => {
    if (!this.mounted) {
      return Promise.resolve();
    }

    this.flicker.init(line, s => {
      this.setState({ textLines: this.state.textLines.concat(['']) }, () => {
        const textLines = this.state.textLines.slice();
        textLines[lineIdx] = s;
        this.setState({ textLines });
      });
    });
  };

  render() {
    const Tag = this.props.tagName;
    const props = { ...this.props };

    delete props.tagName;
    delete props.className;
    const innerTree = cloneElementWithSpecifiedText({
      element: this.props.children,
      textLines: this.state.textLines,
    });

    return <Tag>{innerTree}</Tag>;
  }
}

export default FlickerText;
