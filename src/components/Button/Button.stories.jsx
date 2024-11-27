import { FaSearch } from 'react-icons/fa';
import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A button component with various states and configurations.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Button content',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when button is clicked',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: 'undefined' },
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'button' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state of the button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Loading state of the button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Visual theme of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'light' },
      },
    },
    ariaLabel: {
      control: 'text',
      description:
        'Accessibility label (especially useful for icon-only buttons)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    ariaExpanded: {
      control: 'boolean',
      description:
        'Indicates if a button that controls an expandable element is currently expanded',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' },
      },
    },
    icon: {
      description: 'Optional icon inside the button',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the icon relative to the text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'left' },
      },
    },
  },
};

export const Default = {
  args: {
    children: 'Default Button',
  },
};

export const LightTheme = {
  args: {
    children: 'Light Theme',
    theme: 'light',
  },
};

export const DarkTheme = {
  args: {
    children: 'Dark Theme',
    theme: 'dark',
  },
};

export const Disabled = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const Loading = {
  args: {
    children: 'Loading Button',
    loading: true,
  },
};

// Accessibility
export const AccessibilityDemo = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '400px',
      }}
    >
      <Button ariaExpanded={true}>Try Me!</Button>

      <Button ariaLabel='Search'>Search</Button>

      <Button ariaDescribedBy='submit-desc' type='submit'>
        Submit Form
      </Button>

      <div id='submit-desc' style={{ display: 'none' }}>
        Please review all fields before submitting
      </div>
    </div>
  ),
  name: 'Accessibility Features',
};

export const IconButton = {
  args: {
    children: 'Search',
    icon: <FaSearch />,
    ariaLabel: 'Search',
  },
};

export const Interactive = {
  args: {
    children: 'Click Me',
    onClick: () => alert('Button clicked!'),
  },
};
