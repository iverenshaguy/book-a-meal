import { toggleModal, toggleSideNav } from '../../src/actions/ui';

describe('UI Actions', () => {
  it('should return type TOGGLE_MODAL with no payload', () => {
    const action = toggleModal();

    expect(action).toEqual({ type: 'TOGGLE_MODAL', payload: null });
  });

  it('should return type TOGGLE_MODAL with payload', () => {
    const action = toggleModal('addMeal');

    expect(action).toEqual({ type: 'TOGGLE_MODAL', payload: 'addMeal' });
  });

  it('should return type TOGGLE_SIDENAV', () => {
    const action = toggleSideNav();

    expect(action).toEqual({ type: 'TOGGLE_SIDENAV' });
  });
});
