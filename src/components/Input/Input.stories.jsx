import { useForm, FormProvider } from 'react-hook-form';
import Input from './Input';

export default {
  title: 'Components/Input',
  component: Input,
  decorators: [
    (Story) => {
      const methods = useForm({
        mode: 'onBlur', // Trigger validation when input loses focus (e.g., empty field)
        defaultValues: {
          username: '',
          email: '',
          password: '',
          requiredField: '',
        },
      });

      return (
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit((data) =>
              console.log('Form submitted:', data)
            )}
            style={{
              width: '300px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <Story />
          </form>
        </FormProvider>
      );
    },
  ],
  argTypes: {
    name: {
      control: 'text',
      description: 'Name of the input field (used for form registration)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text for the input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'HTML input type',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    validationRules: {
      description: 'Validation rules for react-hook-form',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
    description: {
      control: 'text',
      description: 'Additional description text for the input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    icon: {
      description: 'Optional icon inside the input',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the icon relative to the input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'right' },
      },
    },
  },
};

export const DefaultInput = {
  args: {
    name: 'username',
    label: 'Username',
    placeholder: 'Enter your username',
  },
};

export const Required = {
  args: {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'Enter your email',
    validationRules: {
      required: 'Email is required',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Invalid email address',
      },
    },
  },
};

export const WithDescription = {
  args: {
    name: 'password',
    label: 'Password',
    type: 'password',
    description: 'Must be at least 8 characters long',
    placeholder: 'Enter your password',
    validationRules: {
      minLength: {
        value: 8,
        message: 'Password must be at least 8 characters',
      },
    },
  },
};
