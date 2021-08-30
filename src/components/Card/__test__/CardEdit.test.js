import React from 'react';
import  CardEdit  from '../CardEdit';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('component renders and takes snapshot', () => {
    const component = render(
    <CardEdit card={{name: "ss"}}></CardEdit>);
    expect(component.container).toMatchSnapshot();
  });
