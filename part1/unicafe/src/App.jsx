import { useState } from 'react'

function Button ({ onClick, children }) {
  return (
    <button type='button' onClick={onClick}>
      {children}
    </button>
  )
}

function StaticLine ({ text, value }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

function Statics ({ good, neutral, bad }) {
  const total = good + neutral + bad
  const average = (good * 1 + bad * -1) / total
  const positive = `${good * (100 / total)}%`

  if (total === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <StaticLine text='Good' value={good} />
        <StaticLine text='Neutral' value={neutral} />
        <StaticLine text='Bad' value={bad} />
        <StaticLine text='All' value={total} />
        <StaticLine text='Average' value={average} />
        <StaticLine text='Positive' value={positive} />
      </tbody>
    </table>
  )
}

function App () {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodButton = () => {
    setGood((prevGood) => prevGood + 1)
  }

  const handleNeutralButton = () => {
    setNeutral((prevNeutral) => prevNeutral + 1)
  }

  const handleBadButton = () => {
    setBad((prevBad) => prevBad + 1)
  }

  return (
    <>
      <h1>Give Feedback</h1> <br />
      <Button onClick={handleGoodButton}>Good</Button>
      <Button onClick={handleNeutralButton}>Neutral</Button>
      <Button onClick={handleBadButton}>Bad</Button>
      <h2>Statics</h2>
      <Statics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
