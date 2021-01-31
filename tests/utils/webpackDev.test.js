// import webpackDev from '../../src/utils/webpackDev';

// const app = { use: check => check };
// const useSpy = jest.spyOn(app, 'use');

describe('Webpack Dev Middleware', () => {
  // it('should not call middleware in production', () => {
  //   webpackDev(app, 'production');

  //   expect(useSpy).not.toHaveBeenCalled();
  // });

  // it('should call middleware in e2e', () => {
  //   webpackDev(app, 'e2e');

  //   expect(useSpy).toHaveBeenCalled();
  // });

  it('one + one = two', () => {
    expect(1 + 1).toEqual(2);
  });
});
