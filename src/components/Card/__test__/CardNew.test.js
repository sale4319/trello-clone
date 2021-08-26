import React from 'react';
import CardNew from '../CardNew';

import '@testing-library/jest-dom/extend-expect';

import renderer from 'react-test-renderer';

test('component renders', () => {
    renderer.create(<CardNew />).getInstance();

  });

test("mateches snapshot", () => {
    const tree = renderer.create(<CardNew/>).toJSON();
    expect(tree).toMatchSnapshot();
});