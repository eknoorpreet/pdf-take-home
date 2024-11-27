import LoginForm from './LoginForm';
import PropTypes from 'prop-types';
import { FormProvider, useForm } from 'react-hook-form';

const LoginFormWrapper = ({ theme }) => {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
      }}
    >
      <FormProvider {...methods}>
        <LoginForm initialTheme={theme} />
      </FormProvider>
    </div>
  );
};

LoginFormWrapper.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
};

export default {
  title: 'Components/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    theme: {
      control: {
        type: 'select',
        options: ['light', 'dark'],
      },
    },
  },
};

export const LightTheme = () => <LoginFormWrapper theme='light' />;
export const DarkTheme = () => <LoginFormWrapper theme='dark' />;

export const WithErrors = () => {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: 'invalid-email',
      password: '123',
    },
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#ffffff',
      }}
    >
      <FormProvider {...methods}>
        <LoginForm
          initialTheme='light'
          forceErrors={{
            email: {
              type: 'pattern',
              message: 'Please enter a valid email address',
            },
            password: {
              type: 'minLength',
              message: 'Password must be at least 8 characters',
            },
          }}
        />
      </FormProvider>
    </div>
  );
};
