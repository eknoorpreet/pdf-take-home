import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './PasswordStrength.module.css';

const PasswordStrength = ({ password }) => {
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    calculatePasswordStrength(password);
  }, [password]);

  const calculatePasswordStrength = (pwd) => {
    // If password is empty, reset
    if (!pwd) {
      setStrength(0);
      setFeedback('');
      return;
    }

    let score = 0;
    const feedbackPoints = [];

    // Check the length of the password
    if (pwd.length >= 12) {
      score += 2;
      feedbackPoints.push('Good length');
    } else if (pwd.length >= 8) {
      score += 1;
      feedbackPoints.push('Minimum length met');
    }

    // Does it contain an uppercase letter
    if (/[A-Z]/.test(pwd)) {
      score += 1;
      feedbackPoints.push('Contains uppercase');
    }

    // Does it contain an lowercase letter
    if (/[a-z]/.test(pwd)) {
      score += 1;
      feedbackPoints.push('Contains lowercase');
    }

    // Does it contain a number
    if (/\d/.test(pwd)) {
      score += 1;
      feedbackPoints.push('Contains number');
    }

    // Does it contain a special character
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
      score += 1;
      feedbackPoints.push('Contains special character');
    }

    // Determine strength of password
    let strengthLevel = 'Weak';
    if (score >= 5) strengthLevel = 'Strong';
    else if (score >= 3) strengthLevel = 'Medium';

    // Set strength and feedback
    setStrength(score);
    setFeedback(feedbackPoints.join(' • '));
  };

  const getStrengthBarColor = () => {
    if (strength <= 2) return styles.weakStrength;
    if (strength <= 4) return styles.mediumStrength;
    return styles.strongStrength;
  };

  return (
    <div className={styles.passwordStrengthContainer}>
      <div className={styles.strengthBarsContainer}>
        <div
          className={`${styles.strengthBar} ${getStrengthBarColor()}`}
          style={{
            width: `${(strength / 5) * 100}%`,
          }}
        />
      </div>
      <div className={styles.strengthFeedback}>
        {feedback && (
          <>
            <span className={styles.strengthLabel}>
              {strength <= 2 ? 'Weak' : strength <= 4 ? 'Medium' : 'Strong'}
            </span>
            <span className={styles.strengthDetails}>{feedback}</span>
          </>
        )}
      </div>
    </div>
  );
};

PasswordStrength.propTypes = {
  password: PropTypes.string,
};

PasswordStrength.defaultProps = {
  password: '',
};

export default PasswordStrength;
