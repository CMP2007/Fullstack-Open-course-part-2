const Header = ({title})=>{
  return(
    <header>
      <h1>{title}</h1>
    </header>
  )
}

const Course = ({course})=>{
  const parts = course.parts
  const total = parts.reduce((ac, ex)=>{
    return ac + ex.exercises
  },0)
  return( 
    <table>
      <Thead title={course.name} /> 
      <tbody>
        <Content parts={course.parts} />
        <Total total={total} />
      </tbody>
    </table>
  )
}

const Thead = ({title})=>{
  return(
    <thead>
      <h2>{title}</h2>
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  return (
    <>
      <Header  title= "Web Development Curriculum" />
      {courses.map(data => 
        <Course key={data.id} course={data} />  
      )}
    </>
  )
}

export default App