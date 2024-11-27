/* eslint-disable react/prop-types */

import styles from './Button.module.css';

const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  theme = 'light',
  className = '',
  loading = false,
  icon,
  iconPosition = 'left',
  ariaLabel,
  ariaExpanded,
  ariaControls,
  ariaDescribedBy,
  ...rest
}) => {
  // if ariaLabel is provided, use that
  // If not provided, check the children:

  // if children is a string, return undefined (i.e. no explicit aria-label)
  // if children is NOT a string (e.g. JSX), default to the string 'Button'
  const buttonAriaLabel =
    ariaLabel || (typeof children === 'string' ? undefined : 'Button');

  // contains only an icon
  const iconOnly = icon && !children;

  const loadingText = loading ? 'Loading, please wait...' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={buttonAriaLabel}
      aria-disabled={disabled || loading}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-describedby={ariaDescribedBy}
      aria-busy={loading}
      className={`${styles.button} ${
        theme === 'dark' ? styles.dark : styles.light
      } ${disabled ? styles.disabled : ''} ${className}`}
      {...rest}
    >
      {loading && (
        <span
          className={styles.spinner}
          aria-hidden='true'
          role='presentation'
        />
      )}

      {loading && <span className={styles.srOnly}>{loadingText}</span>}

      {/* Optional left icon */}
      {icon && iconPosition === 'left' && (
        <span className={styles.icon} aria-hidden='true'>
          {icon}
        </span>
      )}

      <span className={iconOnly ? styles.srOnly : ''}>{children}</span>

      {/* Optional right icon */}
      {icon && iconPosition === 'right' && (
        <span className={styles.icon} aria-hidden='true'>
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;
