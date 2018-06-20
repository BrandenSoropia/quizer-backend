import React from 'react';
import CarrotWelcome from '../static/carrot-welcome-flipped.png';

const QuizCompleted = ({ markUserQuizCompleted }) => (
  <div className="QuizCompleted">
    <p>
      Thank you for partaking in this week's Learn and Earn journey through
      foodwaste.
    </p>
    <img src={CarrotWelcome} alt="Cartoon carrot waving." />
    <p>
      To learn more about all of today's questions, get valuable cooking tips,
      and count today towards your $50 gift card
    </p>
    <a
      src=""
      onClick={() => {
        markUserQuizCompleted();
      }}
    >
      CLICK HERE
    </a>
  </div>
);

export default QuizCompleted;
