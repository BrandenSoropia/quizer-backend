import React from 'react';
import CarrotWelcome from '../static/carrot-welcome-flipped.png';

const QuizCompleted = ({ redirectToLearnMore, markUserQuizCompleted }) => (
  <div className="QuizCompleted">
    <p>
    Thank you for participating in this week’s quiz.
    </p>
    <img src={CarrotWelcome} alt="Cartoon carrot waving." />
    <p>
    To learn more about all of today’s questions, get great tips &amp; recipes, and count today’s
    points towards your grocery gift card
    </p>
    <a
      src=""
      onClick={() => {
        markUserQuizCompleted();
        redirectToLearnMore();
      }}
    >
      CLICK HERE
    </a>
  </div>
);

export default QuizCompleted;
