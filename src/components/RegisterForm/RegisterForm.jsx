import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './RegisterForm.module.css';

const RegisterForm = () => {
  const [theme, setTheme] = useState('light');

  // Initialize react-hook-form
  const methods = useForm({
    mode: 'onBlur', // Validate on blur
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
    reset,
  } = methods;

  // Toggle theme handler
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form submitted:', data);
      reset(); // Reset form after successful submission
    } catch (error) {
      console.log(error);
      setError('root', {
        message: 'This email is already in use',
      });
    }
  };

  const isSubmitDisabled = !isValid || isSubmitting;

  return (
    <div className={`${styles.formContainer} ${styles[theme]}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Sign Up</h2>
        <Button
          onClick={toggleTheme}
          theme={theme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </Button>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className={styles.form}
        >
          <div className='fields'>
            {/* First Name Field */}
            <Input
              name='firstName'
              label='First name'
              type='text'
              placeholder='Enter your first name'
              required='First name is required'
            />

            {/* Last Name Field */}
            <Input
              name='lastName'
              label='Last name'
              type='text'
              placeholder='Enter your last name'
              required='Last name is required'
            />

            {/* Email Field */}
            <Input
              name='email'
              label='Email'
              type='email'
              placeholder='Enter your email'
              required='Email is required'
              validationRules={{
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address',
                },
              }}
            />

            {/* Password Field */}
            <Input
              name='password'
              label='Password'
              type='password'
              placeholder='Enter your password'
              required='Password is required'
              validationRules={{
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).+$/,
                  message:
                    'Password must contain an uppercase letter and a number',
                },
              }}
            />

            {errors.root && (
              <div className={styles.rootError} role='alert'>
                {errors.root.message}
              </div>
            )}
          </div>

          <Button
            type='submit'
            disabled={isSubmitDisabled}
            theme={theme}
            className={styles.submitButton}
          >
            {isSubmitting ? 'Loading...' : 'Sign up'}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default RegisterForm;
