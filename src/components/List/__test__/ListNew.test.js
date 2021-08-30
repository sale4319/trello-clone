import React from 'react';
import  ListNew  from '../ListNew';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('component renders and takes snapshot', () => {
    const component = render(<ListNew/>);
    expect(component.container).toMatchSnapshot();
  });