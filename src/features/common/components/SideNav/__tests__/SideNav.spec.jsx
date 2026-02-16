import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { initialState , caterer } from 'src/config/tests/fixtures';
import { SideNav } from 'src/features/common/components/SideNav';

const mockStore = configureStore([thunk]);
const store = mockStore(initialState);

const renderWithStore = (ui) =>
  render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );

describe('SideNav', () => {
  it('should render SideNav component correctly', () => {
    const { container } = renderWithStore(
      <SideNav user={caterer} open={false} logout={jest.fn()} active="dashboard" />
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly when caterer tab is active (meals)', () => {
    const { container } = renderWithStore(
      <SideNav user={caterer} open={false} logout={jest.fn()} active="meals" />
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly when caterer tab is active (menu)', () => {
    const { container } = renderWithStore(
      <SideNav user={caterer} open={false} logout={jest.fn()} active="menu" />
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly when caterer tab is active (orders)', () => {
    const { container } = renderWithStore(
      <SideNav user={caterer} open={false} logout={jest.fn()} active="orders" />
    );

    expect(container).toMatchSnapshot();
  });

  it('should toggle sidenav and handle link click when dashboard link is clicked', async () => {
    const user = userEvent.setup();
    const toggleSideNavMock = jest.fn();
    const pushMock = jest.fn();

    renderWithStore(
      <SideNav
        user={caterer}
        logout={jest.fn()}
        open
        active="orders"
        toggleSideNav={toggleSideNavMock}
        push={pushMock}
      />
    );

    await user.click(screen.getByRole('button', { name: /dashboard/i }));
    expect(toggleSideNavMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('should toggle sidenav and handle link click when meals link is clicked', async () => {
    const user = userEvent.setup();
    const toggleSideNavMock = jest.fn();
    const pushMock = jest.fn();

    renderWithStore(
      <SideNav
        user={caterer}
        logout={jest.fn()}
        open
        active="orders"
        toggleSideNav={toggleSideNavMock}
        push={pushMock}
      />
    );

    await user.click(screen.getByRole('button', { name: /^meals$/i }));
    expect(toggleSideNavMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith('/meals');
  });

  it('should toggle sidenav and handle link click when menu link is clicked', async () => {
    const user = userEvent.setup();
    const toggleSideNavMock = jest.fn();
    const pushMock = jest.fn();

    renderWithStore(
      <SideNav
        user={caterer}
        logout={jest.fn()}
        open
        active="orders"
        toggleSideNav={toggleSideNavMock}
        push={pushMock}
      />
    );

    await user.click(screen.getByRole('button', { name: /^menu$/i }));
    expect(toggleSideNavMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith('/menu');
  });

  it('should toggle sidenav and handle link click when orders link is clicked', async () => {
    const user = userEvent.setup();
    const toggleSideNavMock = jest.fn();
    const pushMock = jest.fn();

    renderWithStore(
      <SideNav
        user={caterer}
        logout={jest.fn()}
        open
        active="menu"
        toggleSideNav={toggleSideNavMock}
        push={pushMock}
      />
    );

    await user.click(screen.getByRole('button', { name: /^orders$/i }));
    expect(toggleSideNavMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith('/orders');
  });

  it('should close open SideNav when close icon is clicked', async () => {
    const user = userEvent.setup();
    const toggleSideNavMock = jest.fn();

    renderWithStore(
      <SideNav
        user={caterer}
        logout={jest.fn()}
        open
        active="orders"
        toggleSideNav={toggleSideNavMock}
      />
    );

    const closeButton = document.querySelector('div.d-none-md button');
    await user.click(closeButton);

    expect(toggleSideNavMock).toHaveBeenCalled();
  });
});
