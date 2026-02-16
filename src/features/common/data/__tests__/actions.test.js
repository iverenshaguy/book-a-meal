import { setFetching, unsetFetching, toggleModal, toggleSideNav } from 'src/features/common/data/actions';

describe('UI Actions', () => {
  describe('isFetching Actions', () => {
    describe('setFetching', () => {
      it('should return an object with type SET_FETCHING', () => {
        const fetchStatus = setFetching();

        expect(fetchStatus).toEqual({ type: 'SET_FETCHING' });
      });
    });

    describe('unsetFetching', () => {
      it('should return type UNSET_FETCHING', () => {
        const fetchStatus = unsetFetching();

        expect(fetchStatus).toEqual({ type: 'UNSET_FETCHING' });
      });
    });
  });

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
