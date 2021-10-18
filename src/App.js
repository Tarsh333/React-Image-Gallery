import { useEffect, useState } from "react"
import axios from 'axios'
// import Emoji from "./Emoji"
const App = () => {
  const [input, setInput] = useState('')
  const [images, setImages] = useState(null)
  useEffect(() => {
    let cancel
    axios({
      method: 'GET',
      url: `https://pixabay.com/api/?key=23909794-5f7b0447e28e92c392beac53e&q=${input}&image_type=photo&per_page=50`,
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      const urls = res.data.hits.map((data) => {
        return data.largeImageURL
      })
      setImages(urls)
    }).catch(e => {
      if (axios.isCancel(e)) return
    })
    return () => cancel()
  }, [input])


  return (
    <div className="App">
      <h1>IMAGE GALLERY</h1>
      <div className="input"><input type="text" placeholder="Search Images" onChange={(e) => { setInput(e.target.value) }} value={input} /></div>
      <div className="images">
        {images && images.map((data) => <><a className="image" href={data} target="_blank"><img src={data} /></a></>)}</div>
      {images && images.length === 0 && input.length > 0 && <h1>No results found</h1>}
      <footer>
        <span>Images source:</span> <a href="https://pixabay.com/">
          <img className="rights" src="https://pixabay.com/static/img/public/medium_rectangle_a.png" alt="Pixabay" />
        </a>     
        </footer>
    </div>
  )
}

export default App

