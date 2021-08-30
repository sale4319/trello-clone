import React from 'react';
import BoardModal from '../BoardModal';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('component renders and takes snapshot', () => {
    const component = render(<BoardModal/>);
    expect(component.container).toMatchSnapshot();
  });