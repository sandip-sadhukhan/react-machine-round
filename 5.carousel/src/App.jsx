import { useEffect, useState } from 'react'
import './App.css'
import Carousel from './components/carousel'

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  // https://jsonplaceholder.typicode.com/photos?_limit=8

  const fetchImages = async (imgLimit) => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_limit=${imgLimit}`
      )
      const data = await response.json()
      setImages(data);
    } catch(error) {
      console.log("Error fetching images: ", error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchImages(8);
  }, [])

  
  return (
    <div className='carousel-container'>
      <Carousel
       images={images}
       isLoading={loading}
       onImgClick={(img, ind) => {console.log(img, ind)}}
       imgPerSlide={2}
      //  imageLimit={}
      // customPrevButton={}
      // customNextButton={}
      
      />
    </div>
  )
}

export default App
