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

  export default Course