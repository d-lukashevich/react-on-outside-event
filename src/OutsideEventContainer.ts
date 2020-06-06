import { createElement } from 'react';
import useOutsideEvent from './useOutsideEvent';
import { EventHandlerName } from './typings';

export interface OutsideEventContainerProps {
    callback: (event: Event) => void;
    eventHandlerName?: EventHandlerName;
    element?: string;
    [key: string]: any;
}

const OutsideEventContainer = ({
    callback,
    eventHandlerName = 'onClick',
    [eventHandlerName]: additionalHandler,
    element = 'div',
    ...restProps
}: OutsideEventContainerProps) => {
    const batter = useOutsideEvent(callback, eventHandlerName);
    const syntheticHandler = typeof additionalHandler !== 'function' ? batter : batter(additionalHandler);
    return createElement(element, { [eventHandlerName]: syntheticHandler, ...restProps });
};

export default OutsideEventContainer;
