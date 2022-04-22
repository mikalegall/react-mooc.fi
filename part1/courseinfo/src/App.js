const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = (props) => {
    return(
        <h1>{props.course.name}</h1>
    )
  }

  const Part = (props) => {
    return(
        <p>{props.part.name} {props.part.exercises}</p>
    )
  }

  const Content = (props) => {
    return(
    <>
      <Part part={course.parts[0]} />
      <Part part={course.parts[1]} />
      <Part part={course.parts[2]} />
    </>
    )
  }

  const Total = () => {
    let totalAmount = course.parts.reduce(
      (sum, part) => sum + part.exercises, 0 // Here the initial value zero is the first iterations 'sum' as a starting point
    )

    return(
    <div>
      <p>Number of exercises {totalAmount}</p>
    </div>
    )
  }
  

  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

export default App