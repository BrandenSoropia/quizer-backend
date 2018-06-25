import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Answer from './answer';
import styled from 'styled-components';

// Images
import LettuceShrug from '../static/lettuce_shrug.png';
import LettuceRightAnswer from '../static/lettuce_right_answer.png';
import LettuceWrongAnswer from '../static/lettuce_wrong_answer.png';

const QuizProgress = styled.h2`
  text-align: right;
  padding-right: 10%;
`

const AnswerContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: no-wrap;
`

const QuestionText = styled.p`
  color: dark-grey;
  font-size: 1.2rem;
`

const NextButton = styled.button`
  background-color: gray;
  border-radius: 40px;
  font-size: 1.2rem;
  padding: 12px;
  margin: 5px;
  width: 50%;
  color: white;
`

class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disableAnswers: false,
      correctAnswerSelected: false
    };

    this.handleCorrectAnswerClicked = this.handleCorrectAnswerClicked.bind(
      this
    );
    this.handleIncorrectAnswerClicked = this.handleIncorrectAnswerClicked.bind(
      this
    );
    this.disableAnswersButtons = this.disableAnswersButtons.bind(this);
    this.handleAnswerClicked = this.handleAnswerClicked.bind(this);
  }

  // Reset state
  componentDidUpdate(prevProps, prevState) {
    if (prevState.disableAnswers)
      this.setState({
        disableAnswers: false,
        correctAnswerSelected: false
      });
  }

  disableAnswersButtons() {
    this.setState({ disableAnswers: true });
  }

  handleAnswerClicked(isCorrect) {
    this.disableAnswersButtons();

    isCorrect
      ? this.handleCorrectAnswerClicked()
      : this.handleIncorrectAnswerClicked();
  }

  handleCorrectAnswerClicked() {
    this.setState({ correctAnswerSelected: true });
    // TODO: display happy mascot
    this.disableAnswersButtons();
  }

  handleIncorrectAnswerClicked() {
    // TODO: display sad mascot
    this.disableAnswersButtons();
  }

  render() {
    const { disableAnswers, correctAnswerSelected } = this.state;
    const {
      text,
      answers,
      onNextQuestionClick,
      quizProgress,
      isLastQuestion,
      setQuizCompleted
    } = this.props;

    return (
      <div className="Question">
        <QuizProgress>{`Question ${quizProgress.currentQuestion}/${
              quizProgress.totalQuestions
            }`}
        </QuizProgress>
        {disableAnswers && (
          <React.Fragment>
            <h2>{correctAnswerSelected ? 'Yes!' : 'Nice guess!'}</h2>
            <img
              src={
                correctAnswerSelected ? LettuceRightAnswer : LettuceWrongAnswer
              }
            />
            <h2>
              {correctAnswerSelected ? null : 'Here is the right answer:'}
            </h2>
          </React.Fragment>
        )}
        <div>
        {!disableAnswers && (
          <React.Fragment>
            <img src={LettuceShrug} />
            <QuestionText>{text}</QuestionText>
          </React.Fragment>
        )}
        </div>
        <AnswerContainer>
          {answers.map((answer, idx) => (
            <Answer
              key={`answer-${idx}`}
              text={answer.text}
              isCorrect={answer.isCorrect}
              isDisabled={disableAnswers}
              handleAnswerClicked={() =>
                this.handleAnswerClicked(answer.isCorrect)
              }
            />
          ))}
        </AnswerContainer>
        {disableAnswers &&
          !isLastQuestion && (
            <NextButton onClick={onNextQuestionClick}>{'Next Question'}</NextButton>
          )}
        {disableAnswers &&
          isLastQuestion && (
            <NextButton onClick={setQuizCompleted}>{'Done!'}</NextButton>
          )}
      </div>
    );
  }
}

Question.propTypes = {
  text: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      isCorrect: PropTypes.bool
    })
  ).isRequired,
  onNextQuestionClick: PropTypes.func.isRequired
};

export default Question;
