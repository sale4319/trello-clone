import React from 'react';
import ListTitle from '../ListTitle';

import '@testing-library/jest-dom/extend-expect';

import renderer from 'react-test-renderer';

test('component renders', () => {
    renderer.create(<ListTitle />).getInstance();

  });

test("mateches snapshot", () => {
    const tree = renderer.create(<ListTitle/>).toJSON();
    expect(tree).toMatchSnapshot();
});