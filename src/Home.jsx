import React, { useEffect, useState } from "react";
import Axios from "./Axios";

const Home = () => {
  let [state, setState] = useState([]);
  let [searchTitle, setSearchTitle] = useState("");
  let [ascending, setAscending] = useState([]);
  let [descending, setDescending] = useState([]);

  useEffect(() => {
    let Data = async () => {
      let finalData = await Axios.get("/posts");
      setState(finalData.data);
      //   console.log(finalData);
    };
    Data();
  }, []);

  let handleAscending = (e) => {
    console.log(state);
    e.preventDefault();
    let ascending = state.sort((a, b) => {
      return a.id - b.id;
    });
    var newarr = [...ascending];
    setAscending(newarr);
  };

  let handleDescending = (e) => {
    console.log(state);
    e.preventDefault();
    let descending = state.sort((a, b) => {
      return b.id - a.id;
    });
    var newarr = [...descending];
    setDescending(newarr);
  };

  // let hasc = ascending.map((a) => {
  //   return <p>{a.title}</p>;
  // });

  // let hdes = descending.map((b) => {
  //   return <p>{b.title}</p>;
  // });

  const displayTitle = state
    .filter((val, ind) => {
      if (searchTitle == "") {
        return val;
      } else if (val.title.toLowerCase().includes(searchTitle.toLowerCase())) {
        return val;
      }
    })
    .map((x) => {
      return (
        <div key={x.id}>
          <h2>Id:{x.id}</h2>
          <p>{x.title}</p>
        </div>
      );
    });

  return (
    <section id="searchBlock">
      <article>
        <form>
          <input
            type="search"
            placeholder="Search title ..."
            onChange={(e) => {
              setSearchTitle(e.target.value);
            }}
          />
          <button onClick={handleAscending}>Ascending</button>
          <button onClick={handleDescending}>Descending</button>
        </form>
        <h1>Titles:</h1>
        <h1>{displayTitle}</h1>
        {/* <h1>{hasc}</h1>
        <h1>{hdes}</h1> */}
      </article>
    </section>
  );
};

export default Home;
