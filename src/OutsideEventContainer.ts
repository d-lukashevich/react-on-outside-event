import { createElement, forwardRef, useMemo } from 'react';
import useOutsideEvent from './useOutsideEvent';
import { EventHandlerName } from './typings';

export interface OutsideEventContainerProps {
    callback?: (event: Event) => void | null;
    eventHandlerName?: EventHandlerName;
    element?: string;
    [key: string]: any;
}

const OutsideEventContainer = forwardRef(
    (
        {
            callback,
            eventHandlerName = 'onClick',
            [eventHandlerName]: additionalHandler,
            element = 'div',
            ...restProps
        }: OutsideEventContainerProps,
        ref
    ) => {
        const batter = useOutsideEvent(callback, eventHandlerName);
        const syntheticHandler = useMemo(
            () => (typeof additionalHandler !== 'function' ? batter : batter(additionalHandler)),
            [batter, additionalHandler]
        );
        return createElement(element, { [eventHandlerName]: syntheticHandler, ref, ...restProps });
    }
);
OutsideEventContainer.displayName = 'OutsideEventContainer';

export { OutsideEventContainer };
export default OutsideEventContainer;
