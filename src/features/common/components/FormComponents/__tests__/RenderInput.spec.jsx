import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RenderInput } from 'src/features/common/components/FormComponents';

const functionMock = jest.fn();

describe('Form Components: RenderInput', () => {
  const cleanProps = {
    name: 'email',
    placeholder: 'jane',
    type: 'email',
    id: 'email',
    label: 'Email',
    required: true,
    meta: {
      touched: false,
      error: null,
      asyncValidating: false,
    },
    handleChange: functionMock,
    handleBlur: functionMock,
    handleFocus: functionMock,
    value: '',
  };

  const dirtyProps = {
    name: 'email',
    placeholder: 'jane',
    type: 'email',
    id: 'email',
    label: 'Email',
    required: true,
    meta: {
      touched: true,
      error: 'This is an error',
      asyncValidating: false,
    },
    handleChange: functionMock,
    handleBlur: functionMock,
    handleFocus: functionMock,
    value: 'jane@smith.me',
  };

  it('should render RenderInput component correctly', () => {
    const { container } = render(<RenderInput {...cleanProps} />);

    expect(container).toMatchSnapshot();
    expect(container.querySelector('div.invalid-feedback')).not.toBeInTheDocument();
    expect(container.querySelector('input.is-invalid')).not.toBeInTheDocument();
  });

  it('should render checkbox correctly', () => {
    const { container } = render(<RenderInput {...cleanProps} type="checkbox" />);

    expect(container).toMatchSnapshot();
    expect(container.querySelector('.form-input-checkbox')).toBeInTheDocument();
  });

  it('should show error when invalid data is inputted', () => {
    const { container } = render(<RenderInput {...dirtyProps} />);

    expect(container).toMatchSnapshot();
    expect(screen.getByText('This is an error')).toBeInTheDocument();
    expect(container.querySelector('input.is-invalid')).toBeInTheDocument();
  });

  it('should focus input when label is clicked', async () => {
    const user = userEvent.setup();
    render(<RenderInput {...cleanProps} />);

    const input = screen.getByLabelText(/email/i);
    await user.click(screen.getByText('Email'));

    expect(document.activeElement).toBe(input);
  });
});
