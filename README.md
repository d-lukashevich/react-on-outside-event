# react-on-outside-event

> Tools for detecting events outside of VDOM subtree, with portals support

[![NPM](https://img.shields.io/npm/v/react-on-outside-event.svg)](https://www.npmjs.com/package/react-on-outside-event)

## Install

```bash
npm install --save react-on-outside-event
```

## Usage

#### Usage with hook

For simple usage of hook, it is possible just to pass callback function to the hook with handler name.
Then, handler, created from hook, must be passed to the container element.
If You don't provide the handler name, it will be considered as 'onClick'.

```tsx
import * as React from 'react';

import { useOutsideEvent } from 'react-on-outside-event';

const moveOutsideFunction = (event) => {
    console.log(event, 'User did move mouse outside of the container.');
};

const Example = () => {
    const outsideHandler = useOutsideEvent(moveOutsideFunction, 'onMouseMove');
    return <div onMouseMove={outsideHandler} />;
};
```

If You need to attach another function to the containing element, just pass it to the handler.
It will be called with the event object.

```tsx
import * as React from 'react';

import { useOutsideEvent } from 'react-on-outside-event';

const outsideClickFunction = (event) => {
    console.log(event, 'User did click outside of the container.');
};
const myFunctionForClickInsideOfContainer = (syntheticEvent) => {
    console.log(syntheticEvent, 'User did click inside of the container.');
};

const Example = () => {
    const outsideHandler = useOutsideEvent(outsideClickFunction);
    return <div onClick={outsideHandler(myFunctionForClickInsideOfContainer)} />;
};
```

#### Usage with container component

You may prefer to use react-on-outside-event with the containing component (e.g. for usage with class components).
In this case, just pass children, event handler name and callback function to the "OutsideEventContainer".

```tsx
import * as React from 'react';

import { OutsideEventContainer } from 'react-on-outside-event';

const copyOutsideFunction = (event) => {
    console.log(event, 'User did copy outside of the container.');
};

const Example = () => {
    return (
        <OutsideEventContainer eventHandlerName={'onCopy'} callback={copyOutsideFunction}>
            Any valid react elements
        </OutsideEventContainer>
    );
};
```

By default, OutsideEventContainer render "div" element,
but it could be changed for any other element with passing it as "element: prop

```tsx
import * as React from 'react';

import { OutsideEventContainer } from 'react-on-outside-event';

const clickOutsideFunction = (event) => {
    console.log(event, 'User did click outside of the container.');
};

const Example = () => {
    return (
        <OutsideEventContainer callback={clickOutsideFunction} element={'span'}>
            Any valid react elements
        </OutsideEventContainer>
    );
};
```

Also, You could pass as element any component, but appropriate handler must be passed down to the DOM.

```tsx
import * as React from 'react';

import { OutsideEventContainer } from 'react-on-outside-event';

const focusOutsideFunction = (event) => {
    console.log(event, 'User did focus outside of the container.');
};

const OtherComponent = (props) => {
    return <p {...props} />;
};

const Example = () => {
    return (
        <OutsideEventContainer element={OtherComponent} callback={focusOutsideFunction} eventHandlerName={'onFocus'}>
            Any valid react elements
        </OutsideEventContainer>
    );
};
```

## Notes

-   Just like with the "useOutsideEvent", if You do not provide "eventHandlerName" it will be considered as "onClick".
-   All other props passed to the OutsideEventContainer (excluding "callback", "eventHandlerName", "element") will be transfer to the element.
-   It is safe to use pure components as elements for OutsideEventContainer - all functions, created inside, are properly memoized.

## License

MIT © [d-lukashevich](https://github.com/d-lukashevich)

---

These tools are created using [create-react-hook](https://github.com/hermanya/create-react-hook).
