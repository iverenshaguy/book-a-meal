import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { initialState, mealsObj } from 'src/config/tests/fixtures';
import WrappedModal, { Modal } from 'src/features/common/components/Modal';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(initialState);
const storeWithModalOpen = mockStore({
  ...initialState,
  ui: { ...initialState.ui, modals: { open: true, type: 'addMeal' } },
});

const renderModal = (props) => render(
  <Provider store={store}>
    <Modal {...props} />
  </Provider>
);

describe('Modal', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render Modal component correctly when type prop is addMeal', () => {
    const { container } = renderModal({ type: 'addMeal', open: true, submitting: false, toggleModal: jest.fn() });

    expect(container).toMatchSnapshot();
    expect(screen.getByRole('heading', { name: /add a meal/i })).toBeInTheDocument();
    expect(container.querySelector('#modal-title-h3')).toHaveTextContent('Add a Meal');
  });

  it('should not render correctly when modal is closed i.e. open prop is false', () => {
    const { container } = renderModal({ type: 'addMeal', open: false, submitting: false, toggleModal: jest.fn() });

    expect(container).toMatchSnapshot();
    expect(container.firstChild).toBeNull();
  });

  it('should render correctly when type prop is editMeal', () => {
    const { container } = renderModal({
      type: 'editMeal',
      open: true,
      submitting: false,
      toggleModal: jest.fn(),
      meal: mealsObj.meals[0],
    });

    expect(container).toMatchSnapshot();
    expect(screen.getByRole('heading', { name: /edit meal/i })).toBeInTheDocument();
  });

  it('should render correctly when type prop is deleteMeal', () => {
    const { container } = renderModal({ type: 'deleteMeal', open: true, submitting: false, toggleModal: jest.fn() });

    expect(container).toMatchSnapshot();
    expect(screen.getByRole('heading', { name: /delete meal/i })).toBeInTheDocument();
  });

  it('should render correctly when type prop is deleteSuccessMsg', () => {
    const { container } = renderModal({ type: 'deleteSuccessMsg', open: true, toggleModal: jest.fn() });

    expect(container).toMatchSnapshot();
    expect(screen.getByText('Meal Deleted Successfully')).toBeInTheDocument();
  });

  it('should render correctly when type prop is orderSuccessMsg', () => {
    const { container } = renderModal({ type: 'orderSuccessMsg', open: true, toggleModal: jest.fn() });

    expect(container).toMatchSnapshot();
    expect(
      screen.getByText('Thank you for your order. Your belly will be filled up shortly')
    ).toBeInTheDocument();
  });

  it('should render correctly when type prop is orderCanceledMsg', () => {
    const { container } = renderModal({ type: 'orderCanceledMsg', open: true, toggleModal: jest.fn() });

    expect(container).toMatchSnapshot();
    expect(screen.getByText('Order Canceled Successfully')).toBeInTheDocument();
  });

  it('should render correctly when type prop is caterer', () => {
    const { container } = renderModal({ type: 'menu', open: true, submitting: false, toggleModal: jest.fn() });

    expect(container).toMatchSnapshot();
    expect(screen.getByRole('heading', { name: /select meal options/i })).toBeInTheDocument();
  });

  it('should render null when type prop is unknown', () => {
    const { container } = renderModal({ type: 'unknown', open: true, toggleModal: jest.fn() });

    expect(container).toMatchSnapshot();
  });

  it('should call toggleModal function prop when close modal icon is clicked', async () => {
    const user = userEvent.setup();
    const toggleMock = jest.fn();
    renderModal({ type: 'unknown', open: true, submitting: false, toggleModal: toggleMock });

    const closeButton = document.getElementById('modal-close-icon');
    await user.click(closeButton);

    expect(toggleMock).toHaveBeenCalled();
  });

  it('should render connected Modal component correctly', () => {
    const { container } = render(
      <Provider store={storeWithModalOpen}>
        <WrappedModal toggleModal={jest.fn()} />
      </Provider>
    );

    expect(container).toMatchSnapshot();
    expect(screen.getByRole('heading', { name: /add a meal/i })).toBeInTheDocument();
  });
});
