import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Routes from 'src/features/app/Routes';
import authReducer from 'src/features/auth/data/reducer';
import mealsReducer from 'src/features/meals/data/reducer';
import menuReducer from 'src/features/menu/data/reducer';
import uiReducer, { isFetching } from 'src/features/common/data/reducer';
import uploadImageReducer from 'src/features/common/data/images/reducer';
import { initialState, caterer, customer } from 'src/config/tests/fixtures';

const reducers = {
  auth: authReducer,
  meals: mealsReducer,
  menu: menuReducer,
  ui: uiReducer,
  isFetching,
  uploadImage: uploadImageReducer,
};

const unAuthState = {
  auth: { ...initialState.auth, isAuthenticated: false },
  meals: initialState.meals,
  menu: initialState.menu,
  ui: initialState.ui,
  isFetching: false,
  uploadImage: initialState.uploadImage,
};

const store = createStore(combineReducers(reducers), unAuthState, applyMiddleware(thunk));

const authStateWithUser = (user) => ({
  ...unAuthState,
  auth: { ...initialState.auth, isAuthenticated: true, loading: false, user },
});

const renderRoutes = (initialEntries = ['/'], state = unAuthState) => {
  const testStore =
    state === unAuthState ? store : createStore(combineReducers(reducers), state, applyMiddleware(thunk));
  return render(
    <Provider store={testStore}>
      <MemoryRouter initialEntries={initialEntries} initialIndex={0}>
        <Routes />
      </MemoryRouter>
    </Provider>
  );
};

describe('Routes', () => {
  it('should render welcome page', async () => {
    renderRoutes(['/']);

    await waitFor(() => {
      expect(screen.getByText(/Delicious Meals At Your Fingertips/i)).toBeInTheDocument();
    });
  });

  it('should render signin page', async () => {
    renderRoutes(['/signin']);

    await waitFor(() => {
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    });
  });

  it('should render default signup page', async () => {
    renderRoutes(['/signup']);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    });
  });

  it('should render customer signup page', async () => {
    renderRoutes(['/signup?role=customer']);

    await waitFor(() => {
      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    });
  });

  it('should render caterer signup page', async () => {
    renderRoutes(['/signup?role=caterer']);

    await waitFor(() => {
      expect(screen.getByLabelText(/business name/i)).toBeInTheDocument();
    });
  });

  it('should render forgot password page', async () => {
    renderRoutes(['/forgot-password']);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /send me the link/i })).toBeInTheDocument();
    });
  });

  it('should render reset password page', async () => {
    renderRoutes(['/reset-password']);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /reset password/i })).toBeInTheDocument();
    });
  });

  it('should render a not found page for a wrong route', async () => {
    renderRoutes(['/not_found_or_wrong_route']);

    await waitFor(() => {
      expect(screen.getByText(/You Lost Your Way!/i)).toBeInTheDocument();
    });
  });

  it('should render Meals page when authenticated caterer visits /meals', async () => {
    renderRoutes(['/meals'], authStateWithUser(caterer));

    await waitFor(() => {
      expect(screen.getByText(/Add a New Meal/i)).toBeInTheDocument();
    });
  });

  it('should render Menu page when authenticated customer visits /menu', async () => {
    renderRoutes(['/menu'], authStateWithUser(customer));

    await waitFor(() => {
      expect(screen.getByText(/Today's Menu/i)).toBeInTheDocument();
    });
  });
});
