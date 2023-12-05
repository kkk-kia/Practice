import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [search, setSearch] = useState("")
  // const [submitSearch, setSubmitSearch] = useState("")
  const [response, setResponse] = useState("")
  const [show, setShow] = useState("resultHide")

  const getSearch = () => {
    // setSubmitSearch(search)
    // console.log(submitSearch);
    const urlWiki = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url8utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;
    if (search === "") return
    else {
      axios.get(urlWiki).then((res) => {
        setResponse(res.data.query.search)

        console.log(response);
      })
    }

    // const response = await fetch(urlWiki)

  }

  return (
    <div className="App">
      <div className='form'>
        <h1>wikiSearch</h1>
        <input onChange={(e) => { setSearch(e.target.value) }} placeholder=''></input>
        <button onClick={() => { getSearch(); setShow("resultShow") }}>search</button>
      </div>

      <div className={show}>
        {(response === "") ? "" : response.map((res, index) => {
          return (
            <div key={index}>
              <h2>{res.title}</h2>
              <p>{res.snippet.replace(/<[^>]*>/g, "")}</p>
              <a href={`https://en.wikipedia.org/w/index.php?&curid=${res.pageid}`} target='blank'>Read it</a>
            </div>
          )
        })}
      </div>

    </div>
  );
}

export default App;
