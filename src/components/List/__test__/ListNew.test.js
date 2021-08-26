import React from 'react';
import ListNew from '../ListNew';

import '@testing-library/jest-dom/extend-expect';

import renderer from 'react-test-renderer';

test('component renders', () => {
    renderer.create(<ListNew />).getInstance();

  });

test("mateches snapshot", () => {
    const tree = renderer.create(<ListNew/>).toJSON();
    expect(tree).toMatchSnapshot();
});