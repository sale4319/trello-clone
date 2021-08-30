import React from 'react';
import { Card } from '../Card';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('component renders and takes snapshot', () => {
    const component = render(<Card card={{name: "ss"}}></Card>);
    expect(component.container).toMatchSnapshot();
  });