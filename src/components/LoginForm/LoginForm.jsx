import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './LoginForm.module.css';
import useHttpClient from '../../hooks/useHttpClient';

const LoginForm = () => {
  const [theme, setTheme] = useState('light');
  const { sendReq } = useHttpClient();

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

  // Form submission handler
  const onSubmit = async (data) => {
    // data: {email: '', password: ''}
    // handleSubmit from useForm will do the validation for us behind the scenes
    // Prevents the default form behavior
    // Ensures form validation on fields
    console.log(data);
    try {
      console.log('Form submitted:', data);

      // Simulate API call
      // Use sendReq for API call
      // const responseData = await sendReq(
      //   'https://my-api-endpoint.com/login',
      //   'POST',
      //   JSON.stringify(data),
      //   {
      //     'Content-Type': 'application/json',
      //   }
      // );

      // Handle successful login
      // console.log('Login successful', responseData);
      reset(); // Reset form after successful submission
    } catch (error) {
      // Handle error here
      console.log(error);
      // Set the "overall" error for the form (on submission)
      setError('root', {
        message: 'This email is already in use', // Example error message
      });
    }
  };

  // If any of the form fields have an error or the form is currently being submitted => disable the submit button
  const isSubmitDisabled = !isValid || isSubmitting;

  return (
    <div className={`${styles.formContainer} ${styles[theme]}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Login</h2>
        <Button
          onClick={toggleTheme}
          theme={theme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </Button>
      </div>

      {/* A provider component that propagates the `useForm` methods to all children components via React Context */}
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className={styles.form}
        >
          <div className='fields'>
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

            {/* Root Error */}
            {errors.root && (
              <div className={styles.rootError} role='alert'>
                {errors.root.message}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type='submit'
            disabled={isSubmitDisabled}
            theme={theme}
            className={styles.submitButton}
          >
            {isSubmitting ? 'Loading...' : 'Log in'}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
