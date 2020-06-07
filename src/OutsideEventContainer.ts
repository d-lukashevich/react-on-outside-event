import { createElement, forwardRef, useMemo } from 'react';
import useOutsideEvent from './useOutsideEvent';
import { EventHandlerName } from './typings';

export interface OutsideEventContainerProps {
    /** callback function that will be fired on outside event */
    callback?: (event: Event) => void | null;
    /** name of the event handler, that corresponded with chosen event type. By default - 'onClick' */
    eventHandlerName?: EventHandlerName;
    /** component that will be created as container. By default - 'div' */
    element?: string;
    /** any other props that will be passed to the container */
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
