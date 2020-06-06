import React from 'react';
import ReactDOM from 'react-dom';

import { useOutsideEvent, OutsideEventContainer } from 'react-on-outside-event';

const App = () => {
    const handler = useOutsideEvent(() => {
        console.log('click outside of useOutsideEvent using div');
    });
    const extraHandler = () => {
        console.log('extra handler of useOutsideEvent');
    };
    const extraHandler2 = () => {
        console.log('extra handler of OutsideEventContainer');
    };
    return (
        <div style={{ display: 'flex' }}>
            <div onClick={handler(extraHandler)} style={{ width: 200, height: 200, background: 'red', padding: 5 }}>
                {ReactDOM.createPortal(
                    <div style={{ width: 200, height: 200, background: 'blue', padding: 5 }}>
                        useOutsideEvent: portal part
                    </div>,
                    document.body
                )}
                Div with useOutsideEvent
            </div>
            <OutsideEventContainer
                onClick={extraHandler2}
                callback={() => {
                    console.log('click outside of OutsideEventContainer');
                }}
                style={{ width: 200, height: 200, background: 'green', padding: 5 }}>
                {ReactDOM.createPortal(
                    <div style={{ width: 200, height: 200, background: 'yellow', padding: 5 }}>
                        OutsideEventContainer: portal part
                    </div>,
                    document.body
                )}
                Div with OutsideEventContainer
            </OutsideEventContainer>
        </div>
    );
};
export default App;
