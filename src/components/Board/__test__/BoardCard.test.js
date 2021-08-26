import React from 'react';
import { BoardCard } from '../BoardCard';

import '@testing-library/jest-dom/extend-expect';

import renderer from 'react-test-renderer';

test('component renders', () => {
    renderer.create(<BoardCard />).getInstance();

  });

test("mateches snapshot", () => {
    const tree = renderer.create(<BoardCard/>).toJSON();
    expect(tree).toMatchSnapshot();
});