import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GroupExpensePage from './pages/GroupExpensePage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GroupExpensePage />

    </>
  )
}

export default App
