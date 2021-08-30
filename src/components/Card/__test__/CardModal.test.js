import React from 'react';
import  CardModal  from '../CardModal';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('component renders and takes snapshot', () => {
    const component = render(<CardModal card={{name: "ss"}}></CardModal>);
    expect(component.container).toMatchSnapshot();
  });