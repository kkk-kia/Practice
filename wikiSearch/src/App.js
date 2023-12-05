import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [search, setSearch] = useState("")
  // const [submitSearch, setSubmitSearch] = useState("")
  const [response,setResponse] = useState("")
 
  const getSearch = () => {
    // setSubmitSearch(search)
    // console.log(submitSearch);
    const urlWiki = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url8utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;
    if(search === "") return
    else{
    axios.get(urlWiki).then((res)=>{
      setResponse(res.data.query.search)
      console.log(res.data.query.search);
      console.log(response);
    })
    }

    // const response = await fetch(urlWiki)

  }

  return (
    <div className="App">

      <h1>wesapp!!</h1>
      <input onChange={(e) => { setSearch(e.target.value) }}></input>
      <button onClick={getSearch}>search</button>

      <div className='result'>
        {
          (response === "") ? "" : response.map((res,index)=>{
            return(<div key={index}>
              <h2>{res.title}</h2>
              <p>ihofihgieohghegi</p>
              <button>read me!</button>
            </div>)
          })
        }
      </div>

    </div>
  );
}

export default App;
