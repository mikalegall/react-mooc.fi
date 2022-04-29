const Header = (props) => <h2>{props.course.name}</h2>

const Part = (props) => <p>{props.part.name} {props.part.exercises}</p>

const Content = (props) => {
  return(
        props.course.parts.map(
          part => <Part key={part.id} part={part} />
        )
  )
}

const Total = (props) => {
  let totalAmount = props.course.parts.reduce(
    (sum, part) => sum + part.exercises, 0 // Here the initial value zero is the first iterations 'sum' as a starting point
  )
  return(
    <b>Total of exercises {totalAmount}</b>
  )
}


const Course = ( {courses} ) => {

  return (
    courses.map(course =>
    <>
      <Header key={course.id} course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
    )
  )
}

export default Course;