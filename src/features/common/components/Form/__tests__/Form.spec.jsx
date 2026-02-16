import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from 'src/features/common/components/Form/index';
import { clearAuthError } from 'src/features/auth/data/actions';
import { newMeal, initialState } from 'src/config/tests/fixtures';

jest.mock('firebase/storage');

const meta = {
  btnText: 'SIGN IN',
  extra: <p>something</p>,
};

const token = 'sdfghjklfghjbknlmdfghjklnmghjkl';

const getFormProps = (type, metaOverrides = {}, propOverrides = {}) => {
  const base = {
    submitting: false,
    submitError: null,
    type,
    meta: { ...meta, ...metaOverrides },
    meal: type === 'editMeal' ? newMeal : null,
    token: type === 'resetPassword' ? token : null,
    ...propOverrides,
  };
  return base;
};

describe('Form', () => {
  let dispatchMock;
  let mockStore;
  let store;

  beforeEach(() => {
    dispatchMock = jest.fn();
    mockStore = configureStore([thunk]);
    store = mockStore(initialState);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  const renderForm = (type, metaOverrides = {}, propOverrides = {}) => {
    const props = getFormProps(type, metaOverrides, { ...propOverrides, dispatch: dispatchMock });
    return render(
      <Provider store={store}>
        <Form {...props} />
      </Provider>
    );
  };

  describe('snapshots', () => {
    it('should render the Form component correctly', () => {
      const { container } = renderForm('signin');
      expect(container).toMatchSnapshot();
    });

    it('should render the Customer Signup Form correctly when the type prop is customerSignup', () => {
      const { container } = renderForm('customerSignup');
      expect(container).toMatchSnapshot();
    });

    it('should render the Caterer Signup Form correctly when the type prop is catererSignup', () => {
      const { container } = renderForm('catererSignup');
      expect(container).toMatchSnapshot();
    });

    it('should render the Add Meal Form correctly when the type prop is addMeal', () => {
      const { container } = renderForm('addMeal');
      expect(container).toMatchSnapshot();
    });

    it('should render the Edit Meal Form correctly when the type prop is editMeal', () => {
      const { container } = renderForm('editMeal');
      expect(container).toMatchSnapshot();
    });

    it('should disable the form submit button when submitting the form', () => {
      const { container } = renderForm('signin', {}, { submitting: true });
      expect(container).toMatchSnapshot();
      expect(screen.getByRole('progressbar', { name: /three-dots-loading/i })).toBeInTheDocument();
    });

    it("should show an error alert and disable the form submit button when there's a submit error", () => {
      const { container } = renderForm('signin', {}, {
        submitError: 'Username/Password do not match',
      });
      expect(container).toMatchSnapshot();
      expect(screen.getByText('Username/Password do not match')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled();
    });
  });

  it('should disable the form submit button when the form has not been touched', () => {
    renderForm('signin');
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled();
  });

  it('should change the form state when the type prop changes', () => {
    const { rerender } = renderForm('signin');
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();

    const propsEditMeal = getFormProps('editMeal', {}, { dispatch: dispatchMock });
    rerender(
      <Provider store={store}>
        <Form {...propsEditMeal} />
      </Provider>
    );
    expect(screen.getByLabelText(/meal name/i)).toBeInTheDocument();
    const titleInput = screen.getByLabelText(/meal name/i);
    expect(titleInput).toHaveValue(newMeal.title);
  });

  it('should not change the form state when the type prop does not change but the form props update', () => {
    const { rerender } = renderForm('signin');
    const emailInput = screen.getByLabelText(/email address/i);
    expect(emailInput).toHaveValue('');

    const propsSameType = getFormProps('signin', {}, { dispatch: dispatchMock, test: 'test' });
    rerender(
      <Provider store={store}>
        <Form {...propsSameType} />
      </Provider>
    );
    expect(screen.getByLabelText(/email address/i)).toHaveValue('');
  });

  describe('test for right input', () => {
    it('should handle input change on input change for email field', async () => {
      const user = userEvent.setup();
      renderForm('signin');

      const emailInput = screen.getByLabelText(/email address/i);
      await user.click(emailInput);
      expect(dispatchMock).toHaveBeenCalledWith(clearAuthError());

      await user.clear(emailInput);
      await user.type(emailInput, 'iverenshaguy@gmail.com');
      expect(emailInput).toHaveValue('iverenshaguy@gmail.com');
    });

    it('should handle input change on checkbox change for vegetarian field', async () => {
      const user = userEvent.setup();
      renderForm('addMeal');

      const checkbox = screen.getByRole('checkbox', { name: /suitable for vegetarians/i });
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it('should submit a valid form', async () => {
      const user = userEvent.setup();
      renderForm('signin');

      await user.type(screen.getByLabelText(/email address/i), 'iverenshaguy@gmail.com');
      await user.type(screen.getByLabelText(/^password\s*\*?$/i), 'iverenshaguy');

      await user.click(screen.getByRole('button', { name: /sign in/i }));
      expect(dispatchMock).toHaveBeenCalled();
    });

    it('should submit a valid editMeal form', async () => {
      const user = userEvent.setup();
      renderForm('editMeal');

      const titleInput = screen.getByLabelText(/meal name/i);
      await user.clear(titleInput);
      await user.type(titleInput, 'Rice');

      await user.click(screen.getByRole('button', { name: /sign in/i }));
      expect(dispatchMock).toHaveBeenCalled();
    });

    it('should submit a valid resetPassword form', async () => {
      const user = userEvent.setup();
      renderForm('resetPassword');

      const passwordInputs = screen.getAllByLabelText(/password/i);
      await user.type(passwordInputs[0], 'olisaemodi');
      await user.type(screen.getByLabelText(/confirm your password/i), 'olisaemodi');

      await user.click(screen.getByRole('button', { name: /sign in/i }));
      expect(dispatchMock).toHaveBeenCalled();
    });

    it('should call the dispatch function on file input change', async () => {
      renderForm('editMeal');

      const fileInput = document.querySelector('input[name="imageUrl"]');
      const file = new File([''], 'meal.jpg', { type: 'image/jpeg' });
      await userEvent.upload(fileInput, file);

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('test for wrong input', () => {
    it('should sync validate field and form on input change and blur', async () => {
      const user = userEvent.setup();
      renderForm('customerSignup', { btnText: 'SIGN UP' });

      const emailInput = screen.getByLabelText(/email address/i);
      await user.click(emailInput);
      await user.tab();
      expect(screen.getByText('Required!')).toBeInTheDocument();

      await user.type(emailInput, 'emiolaolasanmi');
      await user.tab();
      expect(screen.getByText('Invalid email address!')).toBeInTheDocument();
      expect(emailInput).toHaveValue('emiolaolasanmi');

      const passwordInputs = screen.getAllByLabelText(/password/i);
      await user.click(passwordInputs[0]);
      await user.tab();
      expect(screen.getAllByText('Required!').length).toBeGreaterThanOrEqual(1);
    });
  });
});
