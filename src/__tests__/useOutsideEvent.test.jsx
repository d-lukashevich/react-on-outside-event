import React from 'react';
import { render, unmountComponentAtNode, createPortal } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { useOutsideEvent } from '../useOutsideEvent';

const getContainers = () => {
    const outsideDiv = document.querySelector('#outside');
    const insideDiv = document.querySelector('#inside');
    const insideDivInPortal = document.querySelector('#inside-portal');
    return { outsideDiv, insideDiv, insideDivInPortal };
};

let container = null;
let onOutsideClick = jest.fn();
let onInsideClick = jest.fn();
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    onOutsideClick = jest.fn();
    onInsideClick = jest.fn();
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('catch clicks outside of container', () => {
    act(() => {
        render(
            React.createElement(() => {
                const handler = useOutsideEvent(onOutsideClick);
                return (
                    <>
                        <div id={'inside'} onClick={handler} />
                        <div id={'outside'} />
                    </>
                );
            }),
            container
        );
    });

    const { outsideDiv, insideDiv } = getContainers();

    if (outsideDiv && insideDiv) {
        act(() => {
            outsideDiv.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            insideDiv.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
    }
    expect(onOutsideClick).toHaveBeenCalledTimes(2);
});

it('catch clicks outside of container and execute nested handler', () => {
    act(() => {
        render(
            React.createElement(() => {
                const handler = useOutsideEvent(onOutsideClick);
                return (
                    <>
                        <div id={'inside'} onClick={handler(onInsideClick)} />
                        <div id={'outside'} />
                    </>
                );
            }),
            container
        );
    });

    const { outsideDiv, insideDiv } = getContainers();

    if (outsideDiv && insideDiv) {
        act(() => {
            outsideDiv.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            insideDiv.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
    }
    expect(onOutsideClick).toHaveBeenCalledTimes(2);
    expect(onInsideClick).toHaveBeenCalledTimes(1);
});

it('do not catch clicks inside portal (outside in DOM)', () => {
    act(() => {
        render(
            React.createElement(() => {
                const handler = useOutsideEvent(onOutsideClick);
                return (
                    <>
                        <div id={'inside'} onClick={handler(onInsideClick)}>
                            {createPortal(<div id={'inside-portal'} />, document.body)}
                        </div>
                        <div id={'outside'} />
                    </>
                );
            }),
            container
        );
    });

    const { outsideDiv, insideDiv, insideDivInPortal } = getContainers();

    if (outsideDiv && insideDiv && insideDivInPortal) {
        act(() => {
            insideDivInPortal.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
    }
    expect(onOutsideClick).toHaveBeenCalledTimes(0);
    expect(onInsideClick).toHaveBeenCalledTimes(1);
});
