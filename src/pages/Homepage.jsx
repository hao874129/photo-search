import React, { useState, useEffect } from "react";
import axios from 'axios'
import Search from "./components/Search";
import Picture from "./components/Picture";

const Homepage = () => {
  const [input, setInput] = useState('')
  const [currentSearch, setCurrentSearch] = useState('')
  const [photos, setPhotos] = useState(null)
  const [page, setPage] = useState(1)
  const auth = "8ozFdqgpjKlORXrDbessEcW9oQuO8Prp04ZbsA8pGoce3O6ulr9o01SX"

  const search = async () => {
    let newURL
    setPage(1)
    if (input === '') {
      newURL = `https://api.pexels.com/v1/curated?page=1&per_page=15`
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${input}&page=1&per_page=15`
    }
    try {
      let result = await axios.get(newURL, { headers: { Authorization: auth } })
      setPhotos(result.data.photos)
      setCurrentSearch(input)
    } catch (e) {
      console.log(e);
    }
  }

  /*eslint-disable*/
  useEffect(() => { search() }, [])

  const morePicture = async () => {
    let newURL
    setPage(page+1)
    if (currentSearch === '') {
      newURL = `https://api.pexels.com/v1/curated?page=${page + 1}&per_page=15`
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&page=${page + 1}&per_page=15`
    }
    try {
      let result = await axios.get(newURL, { headers: { Authorization: auth } })
      setPhotos(photos.concat(result.data.photos))
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search search={() => { search() }} setInput={setInput} />
      <div className="pictures">
        {
          photos && photos.map(photo => (
            <Picture photo={photo} key={photo.id} />
          ))
        }
      </div>
      <div className="morePicture">
        <button onClick={morePicture}>更多圖片</button>
      </div>
    </div>
  );
};

export default Homepage;
