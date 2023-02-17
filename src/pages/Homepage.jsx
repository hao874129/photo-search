import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from 'axios'
import Search from "./components/Search";
import Picture from "./components/Picture";

const Homepage = () => {
  const [input, setInput] = useState('')
  const [currentSearch, setCurrentSearch] = useState('')
  const [photos, setPhotos] = useState(null)
  const [page, setPage] = useState(1)
  const auth = "8ozFdqgpjKlORXrDbessEcW9oQuO8Prp04ZbsA8pGoce3O6ulr9o01SX"

  const initialURL = useMemo(() => {
    return `https://api.pexels.com/v1/curated?page=${page}&per_page=15`
  }, [page])

  const searchURL = useMemo(() => {
    return `https://api.pexels.com/v1/search?query=${currentSearch}&page=${page}&per_page=15`
  }, [currentSearch, page])

  const search = useCallback((input) => {
    setPage(1)
    setCurrentSearch(input)
  }, [])

  const morePicture = useCallback(() => {
    setPage(page + 1)
  }, [page])

  useEffect(() => {
    async function fetchData() {
      let newURL = ''
      if (currentSearch === '') {
        newURL = initialURL
      } else {
        newURL = searchURL
      }
      try {
        let result = await axios.get(newURL, { headers: { Authorization: auth } })
        if (page === 1) {
          setPhotos(result.data.photos)
        }else{
          setPhotos(photos => (photos.concat(result.data.photos)))
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData()
  }, [initialURL, searchURL, currentSearch,page])

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search search={() => { search(input) }} setInput={setInput} />
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
