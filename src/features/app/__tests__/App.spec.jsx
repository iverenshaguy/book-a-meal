import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from 'src/features/app/App';
import store from 'src/store/configureStore';

describe('App', () => {
  it('should render the app component correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
