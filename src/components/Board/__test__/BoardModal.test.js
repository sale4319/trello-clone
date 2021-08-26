import React from 'react';
import BoardModal from '../BoardModal';

import '@testing-library/jest-dom/extend-expect';

import renderer from 'react-test-renderer';

test('component renders', () => {
    renderer.create(<BoardModal />).getInstance();

  });

test("mateches snapshot", () => {
    const tree = renderer.create(<BoardModal/>).toJSON();
    expect(tree).toMatchSnapshot();
});