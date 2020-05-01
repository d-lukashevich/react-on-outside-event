# react-on-outside-event

> Tools for detecting events outside of VDOM subtree, with portals support

[![NPM](https://img.shields.io/npm/v/react-on-outside-event.svg)](https://www.npmjs.com/package/react-on-outside-event) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-on-outside-event
```

## Usage

```tsx
import * as React from 'react'

import { useMyHook } from 'react-on-outside-event'

const Example = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
```

## License

MIT © [d-lukashevich](https://github.com/d-lukashevich)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
