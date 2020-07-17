import { UIEvent, useMemo } from 'react';
import { useEffect, useCallback, useRef } from 'react';
import { EventHandlerName } from './typings';

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
    const validateEvent = useMemo(
        () => ({ type }: UIEvent) => {
            if (type !== eventName) {
                throw new Error(
                    `React-on-outside-event expected event type "${eventName}", but got "${type}". Please, check that You passed outside-event handler with proper event name to your react element.`
                );
            }
        },
        [eventName]
    );

    const handleEvent = useCallback(
        (event: UIEvent) => {
            if (callback) {
                validateEvent(event);
                status.current = false;
            }
            return undefined;
        },
        [callback, validateEvent]
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
        if (callback) {
            const pitcher = () => (status.current = true);
            const catcher = (event: Event) => status.current && callback(event);

            document.addEventListener(eventName, pitcher, true);
            document.addEventListener(eventName, catcher);
            return () => {
                document.removeEventListener(eventName, pitcher, true);
                document.removeEventListener(eventName, catcher);
            };
        }
        return undefined;
    }, [callback, eventName, status]);

    return batter;
};

export default useOutsideEvent;
