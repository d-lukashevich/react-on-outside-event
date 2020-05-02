import { UIEvent } from 'react';
import { useEffect, useCallback, useRef } from 'react';

export const useOutsideEvent = (callback: (event: Event) => void, eventType: string = 'click') => {
    const status = useRef(false);
    const batter = useCallback(
        (incoming: UIEvent | ((event: UIEvent) => void)) => {
            if (typeof incoming === 'function') {
                return (event: UIEvent) => {
                    incoming(event);
                    status.current = false;
                    return undefined;
                };
            } else {
                status.current = false;
                return undefined;
            }
        },
        [status]
    );

    useEffect(() => {
        const pitcher = () => {
            status.current = true;
        };
        const catcher = (event: Event) => {
            if (callback && status.current) callback(event);
            status.current = false;
        };

        document.addEventListener(eventType, pitcher, true);
        document.addEventListener(eventType, catcher);

        return () => {
            document.removeEventListener(eventType, pitcher, true);
            document.removeEventListener(eventType, catcher);
        };
    }, [callback, eventType, status]);

    return batter;
};

export default useOutsideEvent;
