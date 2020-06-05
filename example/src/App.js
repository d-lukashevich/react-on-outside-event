import React from 'react';
import ReactDOM from 'react-dom';

import { useOutsideEvent } from 'react-on-outside-event';

const App = () => {
    const handler = useOutsideEvent(() => {
        console.log('click-outside');
    });
    const extraHandler = () => {
        console.log('my Extra');
    };
    return (
        <div onClick={handler(extraHandler)} style={{ width: 100, height: 100, background: 'red' }}>
            {ReactDOM.createPortal(
                <div style={{ width: 100, height: 100, background: 'blue' }}>Test with portal</div>,
                document.body
            )}
            Test box
        </div>
    );
};
export default App;
