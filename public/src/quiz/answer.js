import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  background: ${({ isClicked, isCorrect, disabled }) => { 
    if ((isClicked && isCorrect) || (isCorrect && disabled)) return 'rgb(22, 255, 0)';
  }}
`
class Answer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClicked: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  // Reset state
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isDisabled) {
      this.setState({ 
        isClicked: false
      });
    }
  }
  
  handleClick() {
    const { isDisabled, handleAnswerClicked } = this.props;;
    if (isDisabled) return;

    this.setState({ isClicked: true });
    handleAnswerClicked();
  }

  render() {
    const { isClicked } = this.state;
    const { text, isCorrect, isDisabled } = this.props;
      return (
        <Button
          className='Answer' 
          onClick={this.handleClick}
          isClicked={isClicked}
          isCorrect={isCorrect}
          disabled={isDisabled}
        >
          {text}
        </Button>
      )
  }
}

Answer.propTypes = {
  text: PropTypes.string.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  handleAnswerClicked: PropTypes.func.isRequired
}

export default Answer;