import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchForm from 'src/features/common/components/Form/SearchForm';

describe('SearchForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render the SearchForm component correctly when type prop is customer', () => {
    const { container } = render(<SearchForm type="customer" fetchItems={jest.fn()} />);

    expect(container).toMatchSnapshot();
    expect(container.querySelector('.search-btn')).toBeInTheDocument();
  });

  it('should render the SearchForm component correctly when type prop is caterer', () => {
    const { container } = render(<SearchForm type="caterer" fetchItems={jest.fn()} />);

    expect(container).toMatchSnapshot();
    expect(container.querySelector('.search-btn')).not.toBeInTheDocument();
  });

  it('should change the search state when search form is changed', async () => {
    const user = userEvent.setup();
    const { container } = render(<SearchForm type="caterer" fetchItems={jest.fn()} />);
    const input = screen.getByRole('textbox', { name: /search for meals/i });

    await user.type(input, 'Rice');

    expect(input).toHaveValue('Rice');
  });

  it('should call fetchItems 300 milliseconds after search form change', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const fetchItemsMock = jest.fn();
    render(<SearchForm type="caterer" fetchItems={fetchItemsMock} />);
    const input = screen.getByRole('textbox', { name: /search for meals/i });

    await user.type(input, 'Rice');
    jest.runAllTimers();

    expect(fetchItemsMock).toHaveBeenCalledTimes(1);
    expect(fetchItemsMock).toHaveBeenCalledWith(null, 'Rice');
    jest.useRealTimers();
  });
});
