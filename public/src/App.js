import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import Quiz from './quiz';
import services from './services';
import LoginForm from './login';
import QuizCompleted from './quiz/quiz-completed';

const AppContainer = styled.div`
  @media (min-width: 700px) {
    display: flex;
    align-items: column;
    justify-content: center;
    margin: 5%;
  }
`

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      questions: [],
      error: {},
      name: '',
      desc: '',
      img: '',
      prezi: '',
      isQuizComplete: false
    };

    this.setUserId = this.setUserId.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.setQuizCompleted = this.setQuizCompleted.bind(this);
    this.markUserQuizCompleted = this.markUserQuizCompleted.bind(this);
    this.redirectToLearnMore = this.redirectToLearnMore.bind(this);
  }

  isLoggedIn() {
    return this.state.userId !== '';
  }

  setUserId(userId) {
    this.setState({ userId });
  }

  setQuizCompleted() {
    this.setState({ isQuizComplete: true });
  }

  markUserQuizCompleted() {
    const { userId, Id: quizId } = this.state;

    services
      .markQuizComplete({
        user_id: userId,
        quiz_id: quizId,
        completion_date: new Date()
      })
      .then(response => {
        if (response.message) {
          alert(
            "Sorry we couldn't record your quiz completion. Please contact the organizer for help."
          );
        } else {
          alert('Progress successfully recorded. Click OK to continue.');
        }
      });
  }

  redirectToLearnMore() {
    window.location.replace(this.state.prezi);
  }

  componentDidMount() {
    const torontoHoursOffsetFromServerTime = 3; // it's about 3 hours ahead somewhere...
    const time = new Date();
    time.setHours(time.getHours() - torontoHoursOffsetFromServerTime);
    const params = {
      current_date: time
    };

    services
      .getCurrentActiveQuiz(params)
      .then(quiz => {
        this.setState(prevState => {
          // NOTE: Quiz is camelized but it changes "id" to "Id", ew...
          return { ...quiz };
        });
      })
      .catch(error => {
        alert(error);
      });
  }

  render() {
    const { isQuizComplete } = this.state;
    return (
      <AppContainer className="App">
        {this.isLoggedIn() &&
          isQuizComplete && (
            <QuizCompleted redirectToLearnMore={this.redirectToLearnMore} markUserQuizCompleted={this.markUserQuizCompleted}/>
          )}
        {this.isLoggedIn() &&
          !isQuizComplete && (
            <Quiz
              name={this.state.name}
              desc={this.state.desc}
              img={this.state.img}
              prezi={this.state.prezi}
              questions={this.state.questions}
              setQuizCompleted={this.setQuizCompleted}
            />
          )}
        {!this.isLoggedIn() && <LoginForm setUserId={this.setUserId} />}
      </AppContainer>
    );
  }
}

export default App;
