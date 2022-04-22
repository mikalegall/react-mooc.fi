import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({handelClick, text}) => {
  return <button onClick={handelClick}>{text}</button>
}

const Statistics = (props) => {
  let all = props.good + props.neutral + props.bad;
  let average = (props.good - props.bad) / all;
  let positive = props.good / all * 100;
  return (
    <table>
      <tbody>
        <tr>
          <th>
            <Header text={"Statistics"} />
          </th>
        </tr>
        <tr>
          <td>good</td>
          <td>{props.good}</td>
        </tr>
        <tr>
        <td>neutral</td>
        <td>{props.neutral}</td>
      </tr>
      <tr>
        <td>bad</td>
        <td>{props.bad}</td>
     </tr>
     <tr>
      <td>all</td>
      <td>{all}</td>
    </tr>
    <tr>
      <td>average</td>
      <td>{average.toFixed(1)}</td>
    </tr>
    <tr>
      <td>positive</td>
      <td>{positive.toFixed(1)} %</td>
    </tr>
    </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
    <Header text={"Give feedback"} />
    <Button handelClick={() => setGood(good + 1) } text={"Good"}/>
    <Button handelClick={() => setNeutral(neutral + 1) } text={"Neutral"}/>
    <Button handelClick={() => setBad(bad + 1) } text={"Bad"}/>
    {good !== 0 | neutral !== 0 | bad !== 0
    ?
    <Statistics good={good} neutral={neutral} bad={bad} />
    : null}
    </>

    )
}

export default App