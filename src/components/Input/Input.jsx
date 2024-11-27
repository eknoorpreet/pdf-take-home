/* eslint-disable react/prop-types */
import { useId } from 'react';
import { useFormContext } from 'react-hook-form';
import styles from './Input.module.css';
import PasswordStrength from '../PasswordStrength/PasswordStrength';

// Any additional props could include such as minLength, maxLength, etc.
const Input = ({
  name,
  label,
  type,
  required,
  placeholder,
  validationRules,
  description,
  ariaDescribedBy,
  icon,
  iconPosition = 'right',
  ...rest
}) => {
  // We'll probably have more than one instance of the component on the page
  // Distinguish them using a unique ID
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const descriptionId = `${inputId}-description`;

  // Access register and errors from the form context
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  // Get the corresponding error of the current input field
  const error = errors[name]?.message;

  const passwordValue = type === 'password' ? watch('password') : null;

  return (
    <div className={styles.group}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
          {required && (
            <span className={styles.required} aria-hidden='true'>
              {icon}
            </span>
          )}
        </label>
      )}
      <div className={`${styles.wrapper}  ${error ? styles.hasError : ''}`}>
        {icon && iconPosition === 'left' && (
          <span className={styles.icon} aria-hidden='true'>
            {icon}
          </span>
        )}

        <input
          id={name}
          name={name}
          type={type || 'text'}
          placeholder={placeholder}
          className={`
            ${styles.input}
            ${icon ? styles.withIcon : ''}
            ${iconPosition === 'left' ? styles.iconLeft : styles.iconRight}
          `}
          aria-invalid={!!error}
          aria-describedby={
            [
              error ? errorId : null,
              description ? descriptionId : null,
              ariaDescribedBy,
            ]
              .filter(Boolean)
              .join(' ') || undefined
          }
          required={required}
          // 'register' the input field with validation rules
          {...register(name, { required: required, ...validationRules })}
          {...rest}
        />

        {icon && iconPosition === 'right' && (
          <span className={styles.icon} aria-hidden='true'>
            {icon}
          </span>
        )}
      </div>

      {type === 'password' && passwordValue.length > 0 && (
        <div className={styles.passwordStrengthContainer}>
          <PasswordStrength password={passwordValue || ''} />
        </div>
      )}

      {error && (
        <p className={styles.errorMessage} id={errorId} role='alert'>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
