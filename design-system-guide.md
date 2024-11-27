# Login Form Component Design Guide

## Overview

The Login Form is a reusable, accessible form component with built-in theme switching and input validation. It uses the [react-hook-form](https://www.react-hook-form.com/) hook for form state management and validation.

## Component Structure

- Includes `LoginForm`, `Input`, and `Button` sub-components
- Uses `react-hook-form` for form state management and validation
- Supports light/dark theme toggling
- Uses a custom `useHttpClient` hook for managing API requests and reducing unnecessary network traffic

## Props and Configuration

### LoginForm Props

- `None` (Independent component)

### State Management

- Theme State: `light` | `dark`
- Form State:
  - `errors`: Tracks form and field-level validation errors
  - `isSubmitting`: Indicates if the form is currently being submitted
  - `isValid`: Validates form before submission

### Input Component Props

```javascript
/**
 * @typedef {Object} ValidationRule
 * @property {RegExp} [value] - Validation pattern
 * @property {string} [message] - Error message for validation
 *
 * @typedef {Object} InputProps
 * @property {string} name - Input field name
 * @property {string} [label] - Input label
 * @property {'text' | 'email' | 'password'} type - Input type
 * @property {string} [required] - Required field error message
 * @property {string} [placeholder] - Input placeholder
 * @property {{pattern?: ValidationRule, minLength?: ValidationRule}} [validationRules] - Validation rules
 * @property {React.ReactNode} [icon] - Optional icon
 * @property {'left' | 'right'} [iconPosition] - Icon position
 */
```

### Validation Rules

- Email:
  - Required
  - Must match email regex pattern
- Password:
  - Required
  - Minimum 8 characters
  - Must contain at least one uppercase letter and number

## Accessibility Features

- ARIA attributes for form elements
- Screen reader support (e.g., high contrast ratio for colors)
- Keyboard navigation (using semantic HTML such as `<button>` tag which have keyboard navigation enabled by default)
- Error messaging (overall 'root' message)
- Theme toggle with descriptive labels

## Theming

- Two themes: `light` | `dark`
- Theme toggled via button
- Applies theme to entire form container

## Component Usage

The form and its sub-components are highly scalable and reusable.

### Form Configuration

- Create a higher-order component to generate forms dynamically
- Support custom field types and validation
- Implement field conditional rendering (e.g., render `label` only if they're passed as props)

The current implementation of `LoginForm` has the `Input` and `Button` sub-components in the `form` element. But that's not a requirement. You can even define properties ahead of time, iterate over them and render the `Input` and `Button` sub-components accordingly.

Example:

```javascript
// inputConfigurations.js
const inputConfigurations = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    required: 'Email is required',
    validationRules: {
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address',
      },
    },
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: 'Password is required',
    validationRules: {
      minLength: {
        value: 8,
        message: 'Password must be at least 8 characters',
      },
      pattern: {
        value: /^(?=.*[A-Z])(?=.*\d).+$/,
        message: 'Password must contain an uppercase letter and a number',
      },
    },
  },
  // Add more input configurations as needed
  {
    name: 'fullName',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter your full name',
    required: 'Full name is required',
    validationRules: {
      minLength: {
        value: 2,
        message: 'Full name must be at least 2 characters',
      },
    },
  },
];

// LoginForm.jsx
{
  inputConfigurations.map((inputConfig) => (
    <Input key={inputConfig.name} {...inputConfig} />
  ));
}
```

This is more flexible, scalable, and easier to maintain. Furthermore, it reduces repetitive code and allows fast addition of new form fields.

### State Management

Use Context for simple requirements (such as theme toggling) and Redux for complex state

## Performance Considerations

The components use `react-hook-form` which provides the following performance benefits:

- Minimal re-renders
- Async form submission
- Built-in input validation

## Error Handling

Error handling is also managed via `react-hook-form`:

- Centralized error management
- Root-level and field-level error display

## Best Practices

- Use `FormProvider` for complex forms
- Implement client-side and server-side validation
- Provide clear, actionable error messages
- Use `useId()` React hook to generate unique and stable IDs, which ensures consistency between server-side rendering and client-side hydration.

## Why `useHttpClient` hook:

This is not a key part of the Form component but has its benefits:

1. **Centralized Request Management**

- Single source of truth for HTTP requests
- Consistent error handling
- Unified loading state management

2. **Request Cancellation**

```javascript
// Prevents memory leaks and unnecessary network calls
activeHttpReqs.current.forEach((abortCtrl) => abortCtrl.abort());
```

- Automatically cancels ongoing requests when component unmounts
- Prevents state updates on unmounted components
- Reduces unnecessary network traffic

3. **Error Handling**

```javascript
// Centralized error management (API calls)
const [error, setError] = useState();
const clearError = () => {
  setError(null);
};
```

- Standardized error management
- Prevents silent failures

4. **Performance Optimization**

- `useCallback` prevents unnecessary re-renders
- `useRef` for persistent request tracking
- Minimal performance overhead

Use it in the following way:

```javascript
const handleAuthSubmit = async (evt) => {
  evt.preventDefault();
  try {
    const responseData = await sendReq(
      `${process.env.REACT_APP_BASE_URL}/users/login`,
      'POST',
      JSON.stringify(formValues),
      {
        'Content-Type': 'application/json',
      }
    );
    login(responseData.user);
    history.push('/');
  } catch (err) {
    console.log(err);
  }
};
```

## Scalability Strategies

1. Implement a comprehensive token system covering:

- Color
- Typography
- Spacing
- Motion

Use Style Dictionary to generate platform-agnostic design tokens

2. Use the following component structure:

```
/structure
├── /tokens
│   ├── colors.js
│   ├── typography.js
│   └── spacing.js
├── /primitives
│   ├── Button
│   │   ├── Button.jsx
│   │   ├── Button.stories.jsx
│   │   ├── Button.test.jsx
│   │   └── Button.module.css
│   ├── Input
|   |   ├── Input.jsx
│   │   ├── Input.stories.jsx
│   │   ├── Input.test.jsx
│   │   └── Input.module.css
│   └── ...
├── /composed-components
│   ├── LoginForm
│   ├── RegisterForm
│   └── ...
└── /templates
    ├── AuthenticationLayout
    └── DashboardLayout
```

3. Develop a rigorous component acceptance checklist:

- Responsive design compliance
- Accessibility (WCAG) standards
- Cross-browser/platform compatibility
- Performance optimization

4. Versioning and Maintenance Strategy

- Adopt strict [semver](https://semver.org/) principles
- Clear communication of breaking changes
- Maintain detailed changelog documentation
- Provide migration guides for significant updates

5. Component Management

Categorize components such as:

- Core (stable, widely used)
- Experimental (new, limited usage)
- Deprecated (phasing out)

Create clear deprecation and sunset policies

Maintain comprehensive documentation for each component stage

Conduct mandatory design and code reviews for each component

6. Platform Agnostic Design (inspired by [Carbon](https://carbondesignsystem.com/)'s atomic design principles)

- Develop framework-neutral component core
- Create lightweight framework-specific wrappers
- Support React, Vue, Angular (the more, the better).
