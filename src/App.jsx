import './App.css'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'

function App() {

  return (
    <div className='flex flex-col w-full'>
      <Navbar />
      <div className='flex flex-col w-full mt-15' >
        <Home />
      </div>

    </div>
  )
}

export default App;
