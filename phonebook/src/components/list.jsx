const List = ({all, filter})=>{
    if (!filter) {
     return(
      all.map(person => <li key={person.id}><b>{person.name} {person.number}</b></li>)
     )
    }
    else{
     return(
      filter.map(person => <li key={person.id}><b>{person.name} {person.number}</b></li>)
     )
    }
  }

  export default List