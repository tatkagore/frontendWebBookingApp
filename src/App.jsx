import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { response } from 'express'

function App() {
  const [count, setCount] = useState(0)

  fetch("http://localhost:3000/api/reservation", {
    method: "GET"
  })
  .then((response) => response.json())
  .then((data) => console.log(data))

  return (
    <>
      <h1>Simplon-Frontend</h1>
      <p className="paragraph">1ere partie</p>
    </>
  )
}

export default App
