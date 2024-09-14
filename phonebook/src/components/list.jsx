const List = ({all, filter, action})=>{
  console.log(action);
  console.log(all);
  
  
    if (!filter) {
     return(
      all.map(person => {        
        return(
          <li 
            key={person.id}>
            <b>{person.name} {person.number} </b>
            <button onClick={()=>action(person.id)}>Delete</button>
          </li>
        )
      })
     )
    }
    else{
     return(
      filter.map(person => <li key={person.id}><b>{person.name} {person.number}</b></li>)
     )
    }
  }

  export default List