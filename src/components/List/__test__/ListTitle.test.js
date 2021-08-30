import React from 'react';
import  ListTitle  from '../ListTitle';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('component renders and takes snapshot', () => {
    const component = render(<ListTitle/>);
    expect(component.container).toMatchSnapshot();
  });