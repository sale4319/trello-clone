import React from 'react';
import { TitleBar }from '../TitleBar';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

let getByTestId;

beforeEach(() => {
    const component = render(<TitleBar />);
    getByTestId = component.getByTestId;
})

test("image renders with correct alt and src", () => {
    const imgEl = getByTestId("img");

    expect(imgEl.alt).toBe("Boards");
    expect(imgEl.src).toEqual("http://localhost/boards.png");
});

test("title renders with correct text", () => {
    const titleEl = getByTestId("title");

    expect(titleEl.textContent).toBe("Trello's Fratello");
});