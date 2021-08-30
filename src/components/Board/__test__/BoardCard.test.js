import React from 'react';
import { BoardCard } from '../BoardCard';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('component renders and takes snapshot', () => {
    const component = render(<BoardCard/>);
    expect(component.container).toMatchSnapshot();
  });