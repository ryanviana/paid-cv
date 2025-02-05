// ProgressBar.jsx
import React from 'react';
import PropTypes from 'prop-types';

function ProgressBar({ currentQuestion, totalQuestions }) {
  const percentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="w-full px-5 py-2 bg-gray-100">
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="h-3 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%`, backgroundColor: '#27e3cd' }}
        />
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  currentQuestion: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
};

export default ProgressBar;
