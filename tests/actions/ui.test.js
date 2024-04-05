import { toggleModal, toggleSideNav } from '../../src/actions/ui';

describe('UI Actions', () => {
  describe('toggleModal', () => {
    it('should return an object with type TOGGLE_MODAL with no payload when no payload is passed in', () => {
      const action = toggleModal();

      expect(action).toEqual({ type: 'TOGGLE_MODAL', payload: null });
    });

    it('should return an object with type TOGGLE_MODAL with payload when payload is passed in', () => {
      const action = toggleModal('addMeal');

      expect(action).toEqual({ type: 'TOGGLE_MODAL', payload: 'addMeal' });
    });
  });

  describe('toggleSidenav', () => {
    it('should return an object with type TOGGLE_SIDENAV', () => {
      const action = toggleSideNav();

      expect(action).toEqual({ type: 'TOGGLE_SIDENAV' });
    });
  });
});
