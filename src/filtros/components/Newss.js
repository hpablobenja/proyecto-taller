import React, { useContext, useEffect, useMemo, useState } from "react";
import { NewsContext } from "../NewsContext";
import NewsArticle from "./NewsArticle";
import axios from "axios";
import image1 from './123.jpg';
function Newss(props) {
  const { data } = useContext(NewsContext);
  console.log(data);
  const [sportList, setSportList] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("Todo");
  
  // Add default value on page load
  useEffect(() => {
    axios
      .get(
        "http://localhost:9000/datos/api/noticias"
      )
      .then((response) => setSportList(response.data))
      .catch((error) => console.log(error));
  }, []);

  // Function to get filtered list
  function getFilteredList() {
    // Avoid filter when selectedCategory is null
    if (selectedCategory==="Todo") {
      return sportList;
    }
    return sportList.filter((item) => item.categoria === selectedCategory);
  }

  // Avoid duplicate function calls with useMemo
  var filteredList = useMemo(getFilteredList, [selectedCategory, sportList]);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  
  let hash = {};
  var array = sportList.filter(o => hash[o.categoria] ? false : hash[o.categoria] = true);
  console.log(array)
  array.push({categoria: "Todo"})

  return (
  <div>
    <div className="section1">
      <h1 className="head__text" style={{backgroundColor:"#F3E5F5"}}><b>Dashboard de Noticias</b> <a href="/Login"> <button type="button" class="bot btn btn-primary">Login</button></a></h1>
      <img style={{ display: 'flex', margin: 'auto' }} align="center" alt="" src={image1} border="10px"/>
      <br></br>
      <div className="unir" style={{ display: 'flex', margin: 'auto',justifyContent: 'center' }}>
      <h4>Categorias-</h4>
        <select
            name="category-list"
            id="category-list"
            onChange={handleCategoryChange}
          >
            {array.map(empresa=>{
            return(
            <option value={`${empresa.categoria}`}>{empresa.categoria}</option>
            )
        })}
        </select>
      </div>
      <div className="all__news">
        {filteredList
          ? filteredList.map((news) => (
              <NewsArticle data={news} key={news.url} />
            ))
          : "Loading"}
      </div>
    </div>
  </div>
  );
}

export default Newss;
