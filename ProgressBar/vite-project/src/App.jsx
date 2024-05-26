import ProgressBar from './ProgressBar'
import "./App.css"
import { useEffect, useState } from 'react'
const App = () => {

  const [value , setValue] = useState(0);
  const [status , setStatus] = useState(false)
  useEffect(()=>{
    setInterval(()=>{
      setValue((val)=>val+1)
    },100)
  },[])

  return (
    <div className="app">
     <span> Progress Bar </span>
      <ProgressBar  value={value} onComplete={()=>setStatus(true)}/>
      {status?"Completed!":"Loading..."}
    </div>
  )
}

export default App