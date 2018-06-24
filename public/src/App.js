import React, { Component } from 'react';
import './App.css';
import Quiz from './quiz';
import services from './services';
import LoginForm from './login';
import QuizCompleted from './quiz/quiz-completed';

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
      isQuizComplete: false
    };

    this.setUserId = this.setUserId.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.setQuizCompleted = this.setQuizCompleted.bind(this);
    this.markUserQuizCompleted = this.markUserQuizCompleted.bind(this);
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
    const { userId, quizId } = this.state;

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
          alert('Progress successfully recorded.');
        }
      });
  }

  componentDidMount() {
    const params = {
      current_date: new Date()
    };

    services
      .getCurrentActiveQuiz(params)
      .then(quiz => {
        this.setState(prevState => {
          return { ...quiz };
        });
      })
      .catch(error => {
        // TODO: Display error after standardized errors on backend
        alert(error);
      });
  }

  render() {
    const { isQuizComplete } = this.state;

    return (
      <div className="App">
        {this.isLoggedIn() &&
          isQuizComplete && (
            <QuizCompleted markUserQuizCompleted={this.markUserQuizCompleted} />
          )}
        {this.isLoggedIn() &&
          !isQuizComplete && (
            <Quiz
              name={this.state.name}
              desc={this.state.desc}
              img={this.state.img}
              questions={this.state.questions}
              setQuizCompleted={this.setQuizCompleted}
            />
          )}
        {!this.isLoggedIn() && <LoginForm setUserId={this.setUserId} />}
      </div>
    );
  }
}

export default App;
