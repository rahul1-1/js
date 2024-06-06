import { useState } from 'react'
import StarRating from './StarRating'
import './App.css'

function App() {
  const [currRating, setCurrRating] = useState(3)

  const handleRating = (rating) =>{
    console.log("rating ",rating)
    setCurrRating(rating)
  }

  return (
    <div className="star-rating">
      <span>Star Rating</span>
    <StarRating 
    size = {5}
    rating = {currRating}
    onChange = {handleRating}
  
    />
      <span>Current Rating : {currRating}</span>
    </div>
  )
}

export default App
