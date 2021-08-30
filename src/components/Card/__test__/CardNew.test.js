import React from 'react';
import  CardNew  from '../CardNew';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('component renders and takes snapshot', () => {
    const component = render(<CardNew/>);
    expect(component.container).toMatchSnapshot();
  });