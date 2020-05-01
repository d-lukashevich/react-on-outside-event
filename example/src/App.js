import React from 'react'

import { useMyHook } from 'react-on-outside-event'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
