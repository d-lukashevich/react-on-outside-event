import { useEffect, useMemo, useCallback, useRef, UIEvent } from 'react';
import { EventHandlerName } from './typings';

const validateEvent = ({ type }: UIEvent, eventName: string) => {
    if (type !== eventName) {
        throw new Error(
            `React-on-outside-event expected event type "${eventName}", but got "${type}". Please, check that You passed outside-event handler with proper event name to your react element.`
        );
    }
};

/**
 * hook for adding callback function to events outside of the chosen container
 * @param callback - callback function that will be fired on outside event
 * @param eventHandlerName - name of the event handler, that corresponded with chosen event type. By default - 'onClick'
 * @returns {function} handler that must be passed to the container used for defining outside scope
 */
export const useOutsideEvent = (
    callback?: (event: Event) => void | null,
    eventHandlerName: EventHandlerName = 'onClick'
) => {
    const eventName = useMemo(() => eventHandlerName.substring(2).toLowerCase(), [eventHandlerName]);

    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    const handleEvent = useCallback(
        (event: UIEvent) => {
            if (callbackRef.current) {
                validateEvent(event, eventName);
                status.current = false;
            }
            return undefined;
        },
        [eventName]
    );

    const status = useRef(true);
    const batter = useCallback(
        (incoming: UIEvent | ((event: UIEvent) => void)) => {
            if (typeof incoming === 'function') {
                return (event: UIEvent) => {
                    incoming(event);
                    return handleEvent(event);
                };
            } else {
                return handleEvent(incoming);
            }
        },
        [handleEvent]
    );

    useEffect(() => {
        if (callbackRef.current) {
            const pitcher = () => (status.current = true);
            const catcher = (event: Event) => status.current && callbackRef.current && callbackRef.current(event);

            document.addEventListener(eventName, pitcher, true);
            document.addEventListener(eventName, catcher);
            return () => {
                document.removeEventListener(eventName, pitcher, true);
                document.removeEventListener(eventName, catcher);
            };
        }
        return undefined;
    }, [eventName]);

    return batter;
};

export default useOutsideEvent;
