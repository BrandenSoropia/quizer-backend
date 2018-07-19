import React from 'react';
import CarrotWelcome from '../static/carrot-welcome-flipped.png';

const QuizCompleted = ({ redirectToLearnMore }) => (
  <div className="QuizCompleted">
    <p>
      Thank you for participating in this week’s quiz.  Count today’s 10 points towards your grocery gift card!<p/>
      Play 6 weeks of the game, you get 60 points = $10 gift card.<br/>
      Play 12 weeks of the game, you get 120 points = $20 gift card.<br/>
    </p>
    <img src={CarrotWelcome} alt="Cartoon carrot waving." />
    <p>
      To learn more about all of today’s questions, get great tips & recipes
    </p>
    <a
      src=""
      onClick={() => {
        redirectToLearnMore();
      }}
    >
      CLICK HERE
    </a>
  </div>
);

export default QuizCompleted;
