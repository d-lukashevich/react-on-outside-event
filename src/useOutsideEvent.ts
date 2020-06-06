import { UIEvent, useMemo } from 'react';
import { useEffect, useCallback, useRef } from 'react';
import { EventHandlerName } from './typings';

export const useOutsideEvent = (callback: (event: Event) => void, eventHandlerName: EventHandlerName = 'onClick') => {
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

    const status = useRef(true);
    const batter = useCallback(
        (incoming: UIEvent | ((event: UIEvent) => void)) => {
            if (typeof incoming === 'function') {
                return (event: UIEvent) => {
                    validateEvent(event);
                    incoming(event);
                    status.current = false;
                    return undefined;
                };
            } else {
                validateEvent(incoming);
                status.current = false;
                return undefined;
            }
        },
        [status]
    );

    useEffect(() => {
        const catcher = (event: Event) => {
            if (callback && status.current) callback(event);
            status.current = true;
        };

        document.addEventListener(eventName, catcher);
        return () => {
            document.removeEventListener(eventName, catcher);
        };
    }, [callback, eventName, status]);

    return batter;
};

export default useOutsideEvent;
