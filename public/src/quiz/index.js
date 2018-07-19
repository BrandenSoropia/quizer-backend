import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Question from './question';
import _ from 'lodash';
import styled from 'styled-components';

import Carrot from '../static/carrot-welcome.png';
import CarrotFlipped from '../static/carrot-welcome-flipped.png';

const QuizContainer = styled.div`
  width: 100%;
`

const Desc = styled.p`
    color: #666;
    font-size: 1.2rem;
    padding-left: 10%;
    padding-right: 10%;
`

const BeginButton = styled.button`
    color: white;
    font-size:2em;
    border: none;
    border-radius: 40px;
    padding: 20px 50px;
    background-color: #00be46;
`

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuestion: 0,
      showQuiz: false,
      isLastQuestion: false
    };

    this.onBeginClick = this.onBeginClick.bind(this);
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
  }

  onBeginClick() {
    this.setState({
      showQuiz: true
    });
  }
  goToNextQuestion() {
    const { questions } = this.props;

    // Move on to next question
    this.setState(prevState => ({
      currentQuestion: prevState.currentQuestion + 1,
      isLastQuestion: prevState.currentQuestion + 1 === questions.length - 1
    }));
  }

  render() {
    const { currentQuestion, isLastQuestion } = this.state;
    const { name, desc, img, questions, setQuizCompleted } = this.props;

    if (_.isEmpty(questions)) return null;

    return (
      <QuizContainer className="QuizContainer">
        {this.state.showQuiz ? (
          <Question
            quizProgress={{
              currentQuestion: currentQuestion + 1,
              totalQuestions: questions.length
            }}
            explanation={questions[currentQuestion].explanation}
            text={questions[currentQuestion].text}
            answers={questions[currentQuestion].answers}
            onNextQuestionClick={this.goToNextQuestion}
            isLastQuestion={isLastQuestion}
            setQuizCompleted={setQuizCompleted}
          />
        ) : (
          <div>
            <Desc>
                Reduce waste, save money, win groceries!<p/>
                Learn how to reduce food waste at home and throughout our whole food system, learning tips,
                saving money—and the planet along the way.<br/>

                Each weekly quiz earns you points towards winning a grocery gift card.<br/>

                At the end of today’s quiz, explore our learning centre for tips, recipes and the answers to all of
                today’s questions.<p/>
                {name} <p/>

                <img src={require(`../static/welcome/${img}`)} />
                <br />
                {desc} <p/>
             </Desc>
                <BeginButton onClick={this.onBeginClick}>{'Begin'}</BeginButton>
                <br />
                <img src={Carrot} alt="Cartoon carrot waving with left hand." />
                <img
                  src={CarrotFlipped}
                  alt="Cartoon carrot waving with right hand."
                />
          </div>
        )}
      </QuizContainer>
    );
  }
}

Quiz.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      answers: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
          isCorrect: PropTypes.bool
        })
      )
    })
  ).isRequired
};

export default Quiz;
