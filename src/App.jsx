import './App.css'
import Footer from './Components/Footer';
import Navbar from './Components/Navbar'
import Home from './Pages/Home'

function App() {

  return (
    <div className='flex flex-col w-full'>
      <Navbar />
      <div className='flex flex-col w-full mt-15' >
        <Home />
      </div>
      <Footer />

    </div>
  )
}

export default App;
