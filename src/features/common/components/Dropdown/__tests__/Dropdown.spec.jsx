import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dropdown from 'src/features/common/components/Dropdown';

describe('Dropdown', () => {
  it('should render the Dropdown component correctly when the type prop is notification', () => {
    const { container } = render(
      <Dropdown type="notification" toggler={<p>Click Me</p>} content={<div>Hey</div>} />
    );

    expect(container).toMatchSnapshot();
  });

  it('should render the Dropdown component correctly when the type prop is admin-notification', () => {
    const { container } = render(
      <Dropdown type="admin-notification" toggler={<p>Click Me</p>} content={<div>Hey</div>} />
    );

    expect(container).toMatchSnapshot();
  });

  it('should show content when dropdown is hovered and hide on mouse leave', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Dropdown type="notification" toggler={<p>Hover over Me</p>} content={<div>Hey</div>} />
    );

    const dropdown = container.querySelector('.dropdown');
    const content = container.querySelector('#dropdown-content');
    expect(content).not.toHaveClass('show');

    await user.hover(dropdown);
    expect(content).toHaveClass('show');

    await user.unhover(dropdown);
    expect(content).not.toHaveClass('show');
  });
});
