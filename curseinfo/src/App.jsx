const Course = ({course})=>{  
  const parts = course.parts
  const total = parts.reduce((ac, ex)=>{
    return ac + ex.exercises
  },0)
  return( 
    <table>
      <Header title={course.name} /> 
      <tbody>
        <Content parts={course.parts} />
        <Total total={total} />
      </tbody>
    </table>
  )
}

const Header = ({title})=>{
  return(
    <thead>
      <h1>{title}</h1>
    </thead>
  )
}

const Content = ({parts})=>{
  return(
      <>
        {parts.map(part => 
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </>
  )
}

const Part = ({name, exercises})=>{
  return(
    <tr>
      <td>{name} {exercises}</td>    
    </tr>
  )
}

const Total = ({total})=>{
  return(
    <tr>
      <td>
          <b>total of {total} exercises</b>
        </td>
    </tr>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  
  return <Course course={course} />
}

export default App