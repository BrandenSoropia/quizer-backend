import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Answer from './answer';

// Images
import LettuceShrug from '../static/lettuce_shrug.png';
import LettuceRightAnswer from '../static/lettuce_right_answer.png';
import LettuceWrongAnswer from '../static/lettuce_wrong_answer.png';

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
        {!disableAnswers && (
          <React.Fragment>
            <h2>{`Question ${quizProgress.currentQuestion} out of ${
              quizProgress.totalQuestions
            }`}</h2>
            <img src={LettuceShrug} />
            <h2>{text}</h2>
          </React.Fragment>
        )}
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
        {disableAnswers &&
          !isLastQuestion && (
            <button onClick={onNextQuestionClick}>{'Next Question'}</button>
          )}
        {disableAnswers &&
          isLastQuestion && (
            <button onClick={setQuizCompleted}>{'Done!'}</button>
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
