import React from 'react';
import { TitleBar }from '../TitleBar';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test("image renders with correct alt and src", () => {
    const component = render(<TitleBar />);
    const imgEl = component.getByTestId("img");

    expect(imgEl.alt).toBe("Boards");
    expect(imgEl.src).toEqual("http://localhost/boards.png");
});

test("title renders with correct text", () => {
    const component = render(<TitleBar />);
    const titleEl = component.getByTestId("title");

    expect(titleEl.textContent).toBe("Trello's Fratello");
});