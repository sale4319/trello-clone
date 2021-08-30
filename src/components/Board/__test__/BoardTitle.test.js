import React from 'react';
import BoardTitle from '../BoardTitle';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('component renders and takes snapshot', () => {
    const component = render(<BoardTitle board={{name: "Test"}}></BoardTitle>);
    expect(component.container).toMatchSnapshot();
  });