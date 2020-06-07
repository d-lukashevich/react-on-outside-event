import React, { useCallback } from 'react';
import { render, unmountComponentAtNode, createPortal } from 'react-dom';
import { act } from 'react-dom/test-utils';

import OutsideEventContainer from '../OutsideEventContainer';

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

describe('OutsideEventContainer', () => {
    it('catch clicks outside of container', () => {
        act(() => {
            render(
                React.createElement(() => {
                    return (
                        <>
                            <OutsideEventContainer id={'inside'} callback={onOutsideClick} />
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
                    return (
                        <>
                            <OutsideEventContainer id={'inside'} onClick={onInsideClick} callback={onOutsideClick} />
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
                    return (
                        <>
                            <OutsideEventContainer id={'inside'} onClick={onInsideClick} callback={onOutsideClick}>
                                {createPortal(<div id={'inside-portal'} />, document.body)}
                            </OutsideEventContainer>
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

    it('container changes through element prop', () => {
        act(() => {
            render(
                React.createElement(() => {
                    return (
                        <>
                            <OutsideEventContainer id={'inside'} element={'section'} />
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
        expect(document.querySelectorAll('section')).toHaveLength(1);
    });

    it('React.memo components do not rerender if passed as element', () => {
        let renderContainerComponent = jest.fn();
        const Component = React.memo((props) => {
            renderContainerComponent();
            return <div {...props} />;
        });

        act(() => {
            render(
                React.createElement(() => {
                    const [, setState] = React.useState(false);
                    const callback = useCallback(() => setState(true), [setState]);
                    const nestedFn = useCallback(() => {}, []);
                    return (
                        <>
                            <OutsideEventContainer callback={callback} onClick={nestedFn} element={Component} />
                            <div id={'outside'} />
                        </>
                    );
                }),
                container
            );
        });

        const { outsideDiv } = getContainers();

        if (outsideDiv) {
            act(() => {
                outsideDiv.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
        }
        expect(renderContainerComponent).toHaveBeenCalledTimes(1);
    });
});
